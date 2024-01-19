import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { TaskPriorityEnum, TaskStatusEnum } from '../../domains/entities';

/**
 * タスクを作成
 */
export class CreateTaskRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEnum(TaskPriorityEnum)
  priority: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEnum(TaskStatusEnum)
  status: string;

  @ApiPropertyOptional({ type: String, description: 'yyyy-MM-dd HH:mm:ss' })
  @IsOptional()
  @IsDateString()
  @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/)
  dueAt: string;
}

/**
 * タスクを更新
 */
export class UpdateTaskRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEnum(TaskPriorityEnum)
  priority: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEnum(TaskStatusEnum)
  status: string;

  @ApiPropertyOptional({ type: String, description: 'yyyy-MM-dd HH:mm:ss' })
  @IsOptional()
  @IsDateString()
  @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/)
  dueAt: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  userId: number;
}
