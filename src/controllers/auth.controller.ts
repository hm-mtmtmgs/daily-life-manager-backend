import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../domains/entities';
import { LocalAuthGuard } from '../pipelines/guards';
import { LoggerInterceptor } from '../pipelines/interceptors';
import { AuthService } from '../services';
import { AuthLoginRequest, AuthSignupRequest } from './requests';
import { BaseResponse, TokenResponse } from './responses';

@Controller()
@UseInterceptors(LoggerInterceptor)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'サインアップ' })
  async signup(
    @Request() req: Express.Request,
    @Body() body: AuthSignupRequest,
  ): Promise<BaseResponse> {
    return await this.authService.signup(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'ログイン' })
  async login(
    @Request() req: Express.Request,
    @Body() _: AuthLoginRequest,
  ): Promise<TokenResponse> {
    _; // for eslint
    return await this.authService.login(req.user as UserEntity);
  }
}
