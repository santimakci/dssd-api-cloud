import { Injectable } from '@nestjs/common';
import { QueryPaginationDto } from 'src/common/dtos/pagination/query-pagination.dto';
import { TasksRepository } from 'src/repositories';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async findPaginated(query: QueryPaginationDto) {
    const { search = null, page = 0, limit = 10 } = query;
    const [tasks, total] = await this.tasksRepository.findAllPagination(
      page,
      limit,
      search,
    );
    return {
      data: tasks,
      total,
      page,
      limit,
    };
  }
}
