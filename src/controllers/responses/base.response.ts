import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ type: String })
  message: string;
  @ApiProperty({ type: String })
  error: string;
  @ApiProperty({ type: Number })
  statusCode: number;
}

export class TokenResponse {
  @ApiProperty({ type: String })
  token: string;
}
