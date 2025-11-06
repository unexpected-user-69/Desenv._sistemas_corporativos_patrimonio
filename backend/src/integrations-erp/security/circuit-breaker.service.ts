import { Injectable, Logger } from '@nestjs/common';

export enum CircuitState {
  CLOSED = 'closed', // Normal operation
  OPEN = 'open', // Failing, reject requests
  HALF_OPEN = 'half_open', // Testing if service recovered
}

export interface CircuitBreakerConfig {
  /** Número de falhas consecutivas para abrir o circuito */
  failureThreshold: number;
  /** Tempo em ms para tentar novamente (half-open) */
  resetTimeout: number;
  /** Tempo em ms para considerar uma requisição como timeout */
  timeout: number;
}

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private readonly circuits: Map<string, CircuitBreakerState> = new Map();

  /**
   * Configuração padrão
   */
  private readonly defaultConfig: CircuitBreakerConfig = {
    failureThreshold: 5,
    resetTimeout: 60000, // 1 minuto
    timeout: 30000, // 30 segundos
  };

  /**
   * Executa uma função com circuit breaker
   */
  async execute<T>(
    connectorKey: string,
    fn: () => Promise<T>,
    config?: Partial<CircuitBreakerConfig>,
  ): Promise<T> {
    const circuitConfig = { ...this.defaultConfig, ...config };
    const circuit = this.getOrCreateCircuit(connectorKey, circuitConfig);

    // Verificar estado do circuito
    if (circuit.state === CircuitState.OPEN) {
      if (Date.now() - circuit.lastFailureTime > circuitConfig.resetTimeout) {
        // Tentar recuperar (half-open)
        circuit.state = CircuitState.HALF_OPEN;
        this.logger.log(`Circuit breaker for ${connectorKey} entering HALF_OPEN state`);
      } else {
        throw new Error(
          `Circuit breaker is OPEN for connector ${connectorKey}. Too many failures.`,
        );
      }
    }

    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), circuitConfig.timeout),
        ),
      ]);

      // Sucesso - resetar contador de falhas
      if (circuit.state === CircuitState.HALF_OPEN) {
        circuit.state = CircuitState.CLOSED;
        circuit.failureCount = 0;
        this.logger.log(`Circuit breaker for ${connectorKey} recovered to CLOSED state`);
      } else {
        circuit.failureCount = 0;
      }

      return result;
    } catch (error: any) {
      circuit.failureCount++;
      circuit.lastFailureTime = Date.now();

      if (circuit.failureCount >= circuitConfig.failureThreshold) {
        circuit.state = CircuitState.OPEN;
        this.logger.error(
          `Circuit breaker for ${connectorKey} opened after ${circuit.failureCount} failures`,
        );
      }

      throw error;
    }
  }

  /**
   * Obtém ou cria um circuito para um conector
   */
  private getOrCreateCircuit(
    connectorKey: string,
    config: CircuitBreakerConfig,
  ): CircuitBreakerState {
    if (!this.circuits.has(connectorKey)) {
      this.circuits.set(connectorKey, {
        state: CircuitState.CLOSED,
        failureCount: 0,
        lastFailureTime: 0,
        config,
      });
    }
    return this.circuits.get(connectorKey)!;
  }

  /**
   * Obtém estado do circuito
   */
  getCircuitState(connectorKey: string): CircuitState | null {
    const circuit = this.circuits.get(connectorKey);
    return circuit?.state || null;
  }

  /**
   * Reseta um circuito manualmente
   */
  resetCircuit(connectorKey: string): void {
    const circuit = this.circuits.get(connectorKey);
    if (circuit) {
      circuit.state = CircuitState.CLOSED;
      circuit.failureCount = 0;
      circuit.lastFailureTime = 0;
      this.logger.log(`Circuit breaker for ${connectorKey} manually reset`);
    }
  }
}

interface CircuitBreakerState {
  state: CircuitState;
  failureCount: number;
  lastFailureTime: number;
  config: CircuitBreakerConfig;
}

