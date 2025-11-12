import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { QueryPaginationDto } from 'src/common/dtos/pagination/query-pagination.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { TakeTaskDto } from './dto/take-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiBearerAuth('jwt')
@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthenticationGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Crear tareas from Bonita' })
  @Post('/multiple')
  createMultipleTasks(@Body() body: { tasks: string; projectId: string }) {
    return this.tasksService.createMultipleTasks(body);
  }

  @ApiOperation({ summary: 'Crear tarea' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Listar todas las tareas paginadas' })
  @Get()
  findPaginated(@Query() query: QueryPaginationDto) {
    return this.tasksService.findPaginated(query);
  }

  @ApiOperation({
    summary: 'Comprometerse a completar una tarea/ pedido de colaboración',
  })
  @ApiBody({ type: TakeTaskDto })
  @Post(':id/take')
  takeTask(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    body: TakeTaskDto,
  ) {
    return this.tasksService.takeTask(id, body);
  }

  @ApiOperation({
    summary: 'Marcar una tarea como finalizada',
  })
  @Post(':id/finish')
  finishTask(@Param('id') id: string) {
    return this.tasksService.finishTask(id);
  }
}
