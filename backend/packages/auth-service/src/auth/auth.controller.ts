import {
  Body,
  Controller,
  Get,
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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Public } from '../common/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly auth: AuthService,
  ) {}

  @Public()
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
    const ua = req.get('user-agent') ?? undefined;
    return this.auth.login(dto.email, dto.password, ip, ua);
  }

  @Public()
  @Post('refresh')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requisições por minuto
  @ApiOperation({ 
    summary: 'Renovar access token usando refresh token',
    description: 'Valida o refresh token e retorna um novo par de tokens (access + refresh). O refresh token antigo é revogado automaticamente. IMPORTANTE: Use o refreshToken retornado no login (não o accessToken!). O refreshToken é um token aleatório base64url, não um JWT.',
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
    return this.auth.refresh(dto.refreshToken, ip, ua);
  }

  @Public()
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

  @Public()
  @Post('dev-token')
  @ApiOperation({ 
    summary: 'Obter token de desenvolvimento (apenas em desenvolvimento)',
    description: 'Endpoint de desenvolvimento que cria ou retorna um token para um usuário admin padrão. Disponível apenas quando NODE_ENV !== "production". Útil para testes no Swagger. O usuário é criado automaticamente se não existir, ou a senha é atualizada se o usuário já existir.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Token de desenvolvimento gerado com sucesso',
    type: LoginResponseDto,
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Endpoint disponível apenas em desenvolvimento' 
  })
  async getDevToken(@Ip() ip: string, @Req() req: Request) {
    // Apenas em desenvolvimento
    if (process.env.NODE_ENV === 'production') {
      throw new UnauthorizedException('Endpoint disponível apenas em desenvolvimento');
    }

    const ua = req.get('user-agent') ?? undefined;
    
    // Email e senha padrão para desenvolvimento
    const devEmail = process.env.SWAGGER_DEV_EMAIL || 'admin@dev.local';
    const devPassword = process.env.SWAGGER_DEV_PASSWORD || 'AdminPassword123!';
    const devName = process.env.SWAGGER_DEV_NAME || 'Admin Dev';

    // Tenta fazer login com as credenciais padrão
    try {
      return await this.auth.login(devEmail, devPassword, ip, ua);
    } catch (error) {
      // Se o login falhar, tenta criar o usuário automaticamente
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('Invalid credentials') || errorMessage.includes('not found')) {
        try {
          // Tenta criar o usuário de desenvolvimento
          const created = await this.auth.createDevUser(devEmail, devPassword, devName, 'ADMIN');
          
          if (created) {
            // Tenta fazer login novamente após criar o usuário
            return await this.auth.login(devEmail, devPassword, ip, ua);
          } else {
            throw new UnauthorizedException(
              `Não foi possível criar o usuário de desenvolvimento. Verifique se o users-service está acessível.`
            );
          }
        } catch (createError) {
          throw new UnauthorizedException(
            `Não foi possível criar ou autenticar usuário de desenvolvimento. Erro: ${createError instanceof Error ? createError.message : 'Unknown error'}`
          );
        }
      }
      
      // Se não for erro de credenciais, relança o erro original
      throw new UnauthorizedException(
        `Não foi possível autenticar usuário de desenvolvimento. Erro: ${errorMessage}`
      );
    }
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
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        roles: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token inválido ou não fornecido' 
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  async me(@Req() req: Request & { user?: { sub: string; email: string; roles: string[] } }) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.auth.me(req.user.sub);
  }
}



