import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
// ValidationPipe está configurado globalmente no AppModule
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requisições por minuto
  @ApiOperation({ 
    summary: 'Autenticar usuário',
    description: 'Valida as credenciais e retorna access token e refresh token. O access token expira em 15 minutos. Use o refresh token para renovar o access token.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso',
    type: LoginResponseDto,
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciais inválidas' 
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
  })
  async login(@Body() dto: LoginDto, @Ip() ip: string, @Req() req: Request) {
    // express.Request#get fornece acesso tipado aos headers
    const ua = req.get('user-agent') ?? undefined;
    // Em produção, considere definir o refresh em cookie httpOnly (além do body).
    return this.auth.login(dto.email, dto.password, ip, ua);
  }

  @Post('refresh')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requisições por minuto
  @ApiOperation({ 
    summary: 'Renovar access token usando refresh token',
    description: 'Valida o refresh token e retorna um novo par de tokens (access + refresh). O refresh token antigo é revogado automaticamente.',
  })
  @ApiBody({ type: RefreshDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Tokens renovados com sucesso',
    type: RefreshResponseDto,
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Refresh token inválido ou expirado' 
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
  })
  async refresh(
    @Body() dto: RefreshDto,
    @Ip() ip: string,
    @Req() req: Request,
  ) {
    const ua = req.get('user-agent') ?? undefined;
    // Se desejar, você pode aceitar refresh também via cookie httpOnly aqui.
    return this.auth.refresh(dto.refreshToken, ip, ua);
  }

  @Post('logout')
  @ApiOperation({ 
    summary: 'Revogar refresh token (logout)',
    description: 'Revoga o refresh token, invalidando a sessão do usuário. O access token continuará válido até expirar.',
  })
  @ApiBody({ type: LogoutDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Logout realizado com sucesso',
    type: LogoutResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
  })
  async logout(@Body() dto: LogoutDto) {
    return this.auth.logout(dto.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ 
    summary: 'Obter informações do usuário autenticado',
    description: 'Retorna as informações do usuário autenticado extraídas do JWT token. Requer autenticação via Bearer token.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Informações do usuário',
    type: UserResponseDto,
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token inválido ou não fornecido' 
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  async me(@Headers('authorization') authz?: string) {
    if (!authz?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const token = authz.slice('Bearer '.length);

    // Verifica assinatura e extrai payload (sub = userId)
    let payload: unknown;
    try {
      payload = this.jwt.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET ?? 'dev_access_secret',
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    // payload deve ser um objeto com `sub` (string UUID)
    if (
      typeof payload !== 'object' ||
      payload === null ||
      !('sub' in payload)
    ) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const sub = (payload as { sub?: unknown }).sub;
    if (typeof sub !== 'string') {
      throw new UnauthorizedException('Invalid token payload');
    }

    // Valida UUID básico
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(sub)) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return this.auth.me(sub);
  }
}

