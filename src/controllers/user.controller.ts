import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from '../pipelines/interceptors';
import { UserService } from '../services';
import { UserSignupRequest } from './requests';
import { BaseResponse } from './responses';

@Controller()
@ApiTags('user')
@UseInterceptors(LoggerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'サインアップ' })
  async signup(
    @Req() req: Request,
    @Body() body: UserSignupRequest,
  ): Promise<BaseResponse> {
    return await this.userService.signup(body);
  }
}
