import { Injectable, Logger } from '@nestjs/common';

enum CircuitState {
  CLOSED = 'CLOSED',     // Normal operation
  OPEN = 'OPEN',         // Failing, reject requests
  HALF_OPEN = 'HALF_OPEN', // Testing if service recovered
}

interface CircuitConfig {
  failureThreshold: number;  // Number of failures before opening
  successThreshold: number;  // Number of successes to close from half-open
  timeout: number;           // Time in ms before trying half-open
}

interface CircuitStats {
  failures: number;
  successes: number;
  lastFailureTime?: number;
}

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private circuits: Map<string, { state: CircuitState; stats: CircuitStats }> = new Map();
  
  private readonly defaultConfig: CircuitConfig = {
    failureThreshold: 5,
    successThreshold: 2,
    timeout: 60000, // 60 seconds
  };

  async execute<T>(
    serviceName: string,
    operation: () => Promise<T>,
    config: Partial<CircuitConfig> = {},
  ): Promise<T> {
    const finalConfig = { ...this.defaultConfig, ...config };
    const circuit = this.getOrCreateCircuit(serviceName);

    // Check if circuit is open
    if (circuit.state === CircuitState.OPEN) {
      if (this.shouldAttemptReset(circuit, finalConfig)) {
        circuit.state = CircuitState.HALF_OPEN;
        this.logger.log(`Circuit for ${serviceName} is now HALF_OPEN`);
      } else {
        throw new Error(`Circuit breaker is OPEN for ${serviceName}`);
      }
    }

    try {
      const result = await operation();
      this.onSuccess(serviceName, finalConfig);
      return result;
    } catch (error) {
      this.onFailure(serviceName, finalConfig);
      throw error;
    }
  }

  private getOrCreateCircuit(serviceName: string) {
    if (!this.circuits.has(serviceName)) {
      this.circuits.set(serviceName, {
        state: CircuitState.CLOSED,
        stats: { failures: 0, successes: 0 },
      });
    }
    return this.circuits.get(serviceName)!;
  }

  private shouldAttemptReset(circuit: any, config: CircuitConfig): boolean {
    if (!circuit.stats.lastFailureTime) return false;
    return Date.now() - circuit.stats.lastFailureTime >= config.timeout;
  }

  private onSuccess(serviceName: string, config: CircuitConfig) {
    const circuit = this.circuits.get(serviceName)!;
    circuit.stats.failures = 0;
    circuit.stats.successes++;

    if (circuit.state === CircuitState.HALF_OPEN) {
      if (circuit.stats.successes >= config.successThreshold) {
        circuit.state = CircuitState.CLOSED;
        circuit.stats.successes = 0;
        this.logger.log(`Circuit for ${serviceName} is now CLOSED`);
      }
    }
  }

  private onFailure(serviceName: string, config: CircuitConfig) {
    const circuit = this.circuits.get(serviceName)!;
    circuit.stats.failures++;
    circuit.stats.successes = 0;
    circuit.stats.lastFailureTime = Date.now();

    if (circuit.stats.failures >= config.failureThreshold) {
      circuit.state = CircuitState.OPEN;
      this.logger.error(`Circuit for ${serviceName} is now OPEN`);
    }
  }

  getCircuitState(serviceName: string): string {
    const circuit = this.circuits.get(serviceName);
    return circuit?.state || CircuitState.CLOSED;
  }
}

