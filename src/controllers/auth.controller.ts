import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../domains/entities';
import { JwtRefreshAuthGuard, LocalAuthGuard } from '../pipelines/guards';
import { LoggerInterceptor } from '../pipelines/interceptors';
import { AuthService } from '../services';
import { AuthLoginRequest, AuthSignupRequest } from './requests';
import { AccessTokenResponse } from './responses';

@Controller()
@UseInterceptors(LoggerInterceptor)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'サインアップ' })
  @ApiResponse({})
  async signup(
    @Request() req: Express.Request,
    @Body() body: AuthSignupRequest,
  ): Promise<void> {
    return await this.authService.signup(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'ログイン' })
  @ApiResponse({ type: AccessTokenResponse })
  async login(
    @Request() req: Express.Request,
    @Body() _: AuthLoginRequest,
  ): Promise<AccessTokenResponse> {
    _; // for eslint
    return await this.authService.login(req.user as UserEntity);
  }

  @Post('token/refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiOperation({ summary: 'トークンリフレッシュ' })
  @ApiResponse({ type: AccessTokenResponse })
  async refreshToken(
    @Request() req: Express.Request,
  ): Promise<AccessTokenResponse> {
    return await this.authService.login(req.user as UserEntity);
  }
}
