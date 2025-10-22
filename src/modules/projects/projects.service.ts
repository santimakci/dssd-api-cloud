import { Injectable } from '@nestjs/common';
import { QueryPaginationDto } from 'src/common/dtos/pagination/query-pagination.dto';
import { ProjectsRepository, TasksRepository } from 'src/repositories';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async createProject(body: CreateProjectDto) {
    return await this.projectsRepository.save(body);
  }

  async listProjectsPaginated(query: QueryPaginationDto) {
    const { search = null, page = 0, limit = 10 } = query;
    const [projects, total] = await this.projectsRepository.findAllPagination(
      page,
      limit,
      search,
    );
    return {
      data: projects,
      total,
      page,
      limit,
    };
  }

  async listTasksByProjectId(projectId: string) {
    return this.tasksRepository.findByProjectId(projectId);
  }

  async createTask(projectId: string, createTaskDto: CreateTaskDto[]) {
    const tasksToCreate = createTaskDto.map((dto) => ({
      ...dto,
      projectId,
    }));
    return this.tasksRepository.bulkSave(tasksToCreate);
  }
}
