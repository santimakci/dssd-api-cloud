import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  save(data: Partial<Task>) {
    return this.tasksRepository.save(data);
  }

  bulkSave(data: Partial<Task>[]) {
    return this.tasksRepository.save(data);
  }

  findOne(id: string) {
    return this.tasksRepository.findOne({ where: { id } });
  }

  findByCollaboratorEmail(email: string, page: number, limit: number) {
    return this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.collaborator', 'collaborator')
      .where('collaborator.email = :email', { email })
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();
  }

  findAllPagination(
    page: number,
    limit: number,
    search: string,
    projectId: string,
  ) {
    const query = this.tasksRepository
      .createQueryBuilder('task')
      .orderBy('task.createdAt', 'DESC')
      .where('task.projectId = :projectId', { projectId })
      .skip(page * limit)
      .take(limit);

    if (search) {
      query.where(
        'task.name LIKE :search OR task.projectName LIKE :search OR task.ongName LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    return query.getManyAndCount();
  }

  findByProjectId(projectId: string) {
    return this.tasksRepository
      .createQueryBuilder('task')
      .where('task.projectId = :projectId', { projectId })
      .getMany();
  }

  countPendingTasks(projectId: string) {
    return this.tasksRepository
      .createQueryBuilder('task')
      .where('task.projectId = :projectId', { projectId })
      .andWhere('task.isFinished IS false')
      .getCount();
  }

  countPendingTaken() {
    return this.tasksRepository
      .createQueryBuilder('task')
      .where('task.collaboratorId IS NOT NULL')
      .andWhere('task.isFinished IS false')
      .getCount();
  }

  countFinishedTasks() {
    return this.tasksRepository
      .createQueryBuilder('task')
      .andWhere('task.isFinished IS true')
      .getCount();
  }

  countUntakenTasks(projectId: string) {
    const query = this.tasksRepository
      .createQueryBuilder('task')
      .where('task.collaboratorId IS NULL');

    if (projectId) {
      query.andWhere('task.projectId = :projectId', { projectId });
    }

    return query.getCount();
  }
}
