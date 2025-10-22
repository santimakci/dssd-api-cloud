import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from 'src/entities/collaborator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CollaboratorRepository {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorsRepository: Repository<Collaborator>,
  ) {}

  save(data: Partial<Collaborator>) {
    return this.collaboratorsRepository.save(data);
  }
}
