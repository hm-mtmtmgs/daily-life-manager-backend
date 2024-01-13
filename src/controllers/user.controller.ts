import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';
import { UserSignupRequest } from './requests';
import { BaseResponse } from './responses';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'サインアップ' })
  async signup(@Body() body: UserSignupRequest): Promise<BaseResponse> {
    return await this.userService.signup(body);
  }
}
