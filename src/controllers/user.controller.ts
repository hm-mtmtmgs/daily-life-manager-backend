import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../domains/entities';
import { JwtAuthGuard, LocalAuthGuard } from '../pipelines/guards';
import { LoggerInterceptor } from '../pipelines/interceptors';
import { AuthService, UserService } from '../services';
import { UserLoginRequest, UserSignupRequest } from './requests';
import { BaseResponse, MeResponse, TokenResponse } from './responses';

@Controller()
@UseInterceptors(LoggerInterceptor)
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'サインアップ' })
  async signup(
    @Request() req: Express.Request,
    @Body() body: UserSignupRequest,
  ): Promise<BaseResponse> {
    return await this.userService.signup(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'ログイン' })
  async login(
    @Request() req: Express.Request,
    @Body() _: UserLoginRequest,
  ): Promise<TokenResponse> {
    _; // for eslint
    return await this.authService.login(req.user as UserEntity);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '自分の情報を取得' })
  @ApiBearerAuth()
  async me(@Request() req: Express.Request): Promise<MeResponse> {
    return await this.userService.me(req.user as UserEntity);
  }
}
