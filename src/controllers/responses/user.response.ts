import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './base.response';

export class MeResponse extends BaseResponse {
  @ApiProperty({ type: String })
  lastName: string;
  @ApiProperty({ type: String })
  firstName: string;
  @ApiProperty({ type: String })
  email: string;
}
