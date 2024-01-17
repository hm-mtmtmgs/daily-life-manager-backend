import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ type: String })
  message = 'OK';
  @ApiProperty({ type: Number })
  statusCode = HttpStatus.OK;
}

export class TokenResponse extends BaseResponse {
  @ApiProperty({ type: String })
  token: string;
}
