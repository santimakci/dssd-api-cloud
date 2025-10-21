import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';
@Entity({
  name: 'tasks',
})
export class Task extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  projectName: string;

  @Column()
  ongName: string;

  @Column({
    default: false,
  })
  isTaken: boolean;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
  })
  endDate: Date;
}
