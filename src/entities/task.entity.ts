import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { Collaborator } from './collaborator.entity';
@Entity({
  name: 'tasks',
})
export class Task extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  projectId: string;

  @Column({
    nullable: true,
  })
  collaboratorId: string;

  @OneToOne(() => Collaborator, (collaborator) => collaborator.task)
  @JoinColumn({ name: 'collaboratorId' })
  collaborator: Collaborator;

  @Column({
    default: false,
  })
  isFinished: boolean;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
  })
  endDate: Date;
}
