import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [RepositoriesModule],
})
export class TasksModule {}
