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
import { ProjectsService } from './projects.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { QueryPaginationDto } from 'src/common/dtos/pagination/query-pagination.dto';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { CreateProjectDto } from './dtos/create-project.dto';

@ApiTags('Projects')
@ApiBearerAuth('jwt')
@UseGuards(AuthenticationGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Listar proyectos paginados' })
  @Get()
  list(@Query() query: QueryPaginationDto) {
    return this.projectsService.listProjectsPaginated(query);
  }

  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiBody({ type: CreateProjectDto })
  @Post()
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.createProject(body);
  }

  @ApiOperation({ summary: 'Listar tareas por ID de proyecto' })
  @ApiParam({ name: 'projectId', type: 'string' })
  @Get(':projectId/tasks')
  listTasksByProjectId(@Param('projectId') projectId: string) {
    return this.projectsService.listTasksByProjectId(projectId);
  }

  @ApiOperation({ summary: 'Crear tareas en un proyecto' })
  @ApiParam({ name: 'projectId', type: 'string' })
  @ApiBody({ type: [CreateTaskDto] })
  @Post(':projectId/tasks')
  createTask(
    @Param('projectId') projectId: string,
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    createTaskDto: CreateTaskDto[],
  ) {
    return this.projectsService.createTask(projectId, createTaskDto);
  }
}
