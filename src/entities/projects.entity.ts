import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Task } from './task.entity';

@Entity({
  name: 'projects',
})
export class Project extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
  })
  endDate: Date;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];

  @Column()
  ongName: string;

  @Column()
  ongMail: string;
}
