import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { Task } from './task.entity';

@Entity({
  name: 'collaborators',
})
export class Collaborator extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  taskId: string;

  @OneToOne(() => Task, (task) => task.collaborator)
  task: Task;
}
