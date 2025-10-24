import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from 'src/entities/collaborator.entity';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { TasksRepository, UsersRepository } from 'src/repositories';
import { CollaboratorRepository } from './collaborator.repository';

@Module({
  providers: [UsersRepository, TasksRepository, CollaboratorRepository],
  imports: [TypeOrmModule.forFeature([User, Task, Collaborator])],
  exports: [UsersRepository, TasksRepository, CollaboratorRepository],
})
export class RepositoriesModule {}
