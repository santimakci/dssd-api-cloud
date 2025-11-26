import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryPaginationDto } from 'src/common/dtos/pagination/query-pagination.dto';
import { TasksRepository } from 'src/repositories';
import { TakeTaskDto } from './dto/take-task.dto';
import { CollaboratorRepository } from 'src/repositories/collaborator.repository';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly collaboratorsRepository: CollaboratorRepository,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.save(createTaskDto);
  }

  async createMultipleTasks(body: { tasks: string; projectId: string }) {
    try {
      const tasks = JSON.parse(body.tasks);
      for (const task of tasks) {
        await this.tasksRepository.save({
          ...task,
          projectId: body.projectId,
        });
      }
      return { message: 'Tasks successfully created' };
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Invalid tasks format');
    }
  }

  async findPaginated(query: QueryPaginationDto) {
    const { search = null, page = 0, limit = 10, projectId = null } = query;
    if (!projectId) throw new NotFoundException('Project ID is required');
    const [tasks, total] = await this.tasksRepository.findAllPagination(
      page,
      limit,
      search,
      projectId,
    );
    return {
      data: tasks,
      total,
      page,
      limit,
    };
  }

  async takeTask(id: string, body: TakeTaskDto) {
    const { email, name } = body;
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.collaboratorId) {
      throw new NotFoundException('Task already taken');
    }
    const collaborator = await this.collaboratorsRepository.save({
      name,
      email,
      taskId: task.id,
    });
    task.collaboratorId = collaborator.id;
    await this.tasksRepository.save(task);
    return { message: 'Task successfully taken' };
  }

  async finishTask(id: string) {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.isFinished = true;
    await this.tasksRepository.save(task);
    return { message: 'Task successfully finished' };
  }

  countPendingTasks(projectId: string) {
    const total = this.tasksRepository.countPendingTasks(projectId);
    return { total };
  }
}
