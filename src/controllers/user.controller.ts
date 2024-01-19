import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../domains/entities';
import { JwtAuthGuard } from '../pipelines/guards';
import { LoggerInterceptor } from '../pipelines/interceptors';
import { UserService } from '../services';
import { MeResponse } from './responses';

@Controller()
@UseInterceptors(LoggerInterceptor)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '自分の情報を取得' })
  @ApiResponse({ type: MeResponse })
  @ApiBearerAuth()
  async getMe(@Request() req: Express.Request): Promise<MeResponse> {
    return await this.userService.getMe(req.user as UserEntity);
  }
}
