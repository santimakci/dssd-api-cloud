import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { Project } from './projects.entity';
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

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

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
