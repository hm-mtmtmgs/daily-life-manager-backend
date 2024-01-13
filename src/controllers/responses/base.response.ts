import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ type: String })
  public message = 'OK';
  @ApiProperty({ type: Number })
  public statusCode = HttpStatus.OK;
}
