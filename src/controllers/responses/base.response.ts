import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequest } from '../requests';

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
  @ApiProperty({ type: Number, description: 'seconds' })
  expiresIn: number;
}

export class AccessTokenResponse {
  @ApiProperty({ type: String })
  accessToken: string;
  @ApiProperty({ type: Number, description: 'seconds' })
  accessTokenExpiresIn: number;
  @ApiProperty({ type: String })
  refreshToken: string;
  @ApiProperty({ type: String })
  tokenType = 'Bearer';
}

export class PaginationResponse {
  @ApiProperty({ type: Number })
  page: number;
  @ApiProperty({ type: Number })
  pageSize: number;
  @ApiProperty({ type: Number })
  totalPages: number;
  @ApiProperty({ type: Number })
  totalItems: number;

  constructor(pagination: PaginationRequest, count: number) {
    this.page = pagination.page;
    this.pageSize = pagination.pageSize;
    this.totalPages = Math.ceil(count / (pagination.pageSize || 1));
    this.totalItems = count;
  }
}
