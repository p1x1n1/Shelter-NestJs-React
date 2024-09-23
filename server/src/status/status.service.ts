import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  findAll() {
    return this.statusRepository.find();
  }

  findOne(id: number) {
    return this.statusRepository.findOne({ where: { id } });
  }

  create(statusData: Partial<Status>) {
    const status = this.statusRepository.create(statusData);
    return this.statusRepository.save(status);
  }

  update(id: number, statusData: Partial<Status>) {
    return this.statusRepository.update(id, statusData);
  }

  delete(id: number) {
    return this.statusRepository.delete(id);
  }
}
