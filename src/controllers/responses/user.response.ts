import { ApiProperty } from '@nestjs/swagger';

/**
 * 自分の情報を取得
 */
export class MeResponse {
  @ApiProperty({ type: String })
  lastName: string;
  @ApiProperty({ type: String })
  firstName: string;
  @ApiProperty({ type: String })
  email: string;
}
