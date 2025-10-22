import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities';
import { Collaborator } from 'src/entities/collaborator.entity';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import {
  ProjectsRepository,
  TasksRepository,
  UsersRepository,
} from 'src/repositories';
import { CollaboratorRepository } from './collaborator.repository';

@Module({
  providers: [
    UsersRepository,
    TasksRepository,
    ProjectsRepository,
    CollaboratorRepository,
  ],
  imports: [TypeOrmModule.forFeature([User, Task, Collaborator, Project])],
  exports: [
    UsersRepository,
    TasksRepository,
    ProjectsRepository,
    CollaboratorRepository,
  ],
})
export class RepositoriesModule {}
