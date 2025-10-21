import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { TasksRepository, UsersRepository } from 'src/repositories';

@Module({
  providers: [UsersRepository, TasksRepository],
  imports: [TypeOrmModule.forFeature([User, Task])],
  exports: [UsersRepository, TasksRepository],
})
export class RepositoriesModule {}
