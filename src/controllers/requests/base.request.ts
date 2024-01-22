import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max } from 'class-validator';

export class PaginationRequest {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || 1)
  page: number = 1;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || 1)
  @Max(1000)
  pageSize: number = 1;

  constructor(page: number, pageSize: number) {
    this.page = page || 1;
    this.pageSize = pageSize || 1;
  }
}
