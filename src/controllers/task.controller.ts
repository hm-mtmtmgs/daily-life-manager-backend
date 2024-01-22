import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
import { JwtAccessAuthGuard } from '../pipelines/guards';
import { LoggerInterceptor } from '../pipelines/interceptors';
import { TaskService } from '../services';
import {
  CreateTaskRequest,
  PaginationRequest,
  UpdateTaskRequest,
} from './requests';
import {
  TaskDetailResponse,
  TaskListResponse,
  TaskMeResponse,
} from './responses';

@Controller()
@UseInterceptors(LoggerInterceptor)
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('tasks/me')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: '私のタスクリストを取得' })
  @ApiResponse({ type: TaskMeResponse })
  @ApiBearerAuth()
  async getTaskMe(@Request() req: Express.Request): Promise<TaskMeResponse> {
    return this.taskService.getTaskMe(req.user as UserEntity);
  }

  @Get('tasks')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: 'タスクリストを取得' })
  @ApiResponse({ type: TaskListResponse })
  @ApiBearerAuth()
  async getTaskList(
    @Request() req: Express.Request,
    @Query() query: PaginationRequest,
  ): Promise<TaskListResponse> {
    return this.taskService.getTaskList(req.user as UserEntity, query);
  }

  @Get('tasks/:id')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: 'タスク詳細を取得' })
  @ApiResponse({ type: TaskDetailResponse })
  @ApiBearerAuth()
  async getTaskDetail(
    @Request() req: Express.Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskDetailResponse> {
    return this.taskService.getTaskDetail(req.user as UserEntity, id);
  }

  @Post('tasks')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: 'タスクを作成' })
  @ApiResponse({})
  @ApiBearerAuth()
  async createTask(
    @Request() req: Express.Request,
    @Body() body: CreateTaskRequest,
  ): Promise<void> {
    return this.taskService.createTask(req.user as UserEntity, body);
  }

  @Put('tasks/:id')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: 'タスクを更新' })
  @ApiResponse({})
  @ApiBearerAuth()
  async updateTask(
    @Request() req: Express.Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskRequest,
  ): Promise<void> {
    return this.taskService.updateTask(req.user as UserEntity, id, body);
  }

  @Delete('tasks/:id')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: 'タスクを削除' })
  @ApiResponse({})
  @ApiBearerAuth()
  async deleteTask(
    @Request() req: Express.Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.taskService.deleteTask(req.user as UserEntity, id);
  }
}
