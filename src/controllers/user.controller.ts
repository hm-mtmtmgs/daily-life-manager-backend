import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from '../pipelines/interceptors';
import { UserService } from '../services';
import { UserLoginRequest, UserSignupRequest } from './requests';
import { BaseResponse, TokenResponse } from './responses';

@Controller()
@ApiTags('user')
@UseInterceptors(LoggerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'サインアップ' })
  async signup(
    @Req() req: Request,
    @Body() body: UserSignupRequest,
  ): Promise<BaseResponse> {
    return await this.userService.signup(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'ログイン' })
  async login(
    @Req() req: Request,
    @Body() body: UserLoginRequest,
  ): Promise<TokenResponse> {
    return await this.userService.login(body);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: '自分の情報を取得' })
  async me(): Promise<BaseResponse> {
    return await this.userService.me();
  }
}
