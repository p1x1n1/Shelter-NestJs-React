import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Family } from './family.entity';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
  ) {}

  findAll() {
    return this.familyRepository.find({ relations: ['breeds'] });
  }

  findOne(id: number) {
    return this.familyRepository.findOneBy({ id });
  }

  create(familyData: Partial<Family>) {
    const family = this.familyRepository.create(familyData);
    return this.familyRepository.save(family);
  }

  update(id: number, familyData: Partial<Family>) {
    return this.familyRepository.update(id, familyData);
  }

  delete(id: number) {
    return this.familyRepository.delete(id);
  }
}
