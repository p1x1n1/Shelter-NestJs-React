import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './bread.entity';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  findAll() {
    return this.breedRepository.find({ relations: ['family'] });
  }

  findOne(id: number) {
    return this.breedRepository.findOne({
      where: { id },
      relations: ['family'],
    });
  }

  create(breedData: Partial<Breed>) {
    console.log(breedData);
    const breed = this.breedRepository.create(breedData);
    return this.breedRepository.save(breed);
  }

  update(id: number, breedData: Partial<Breed>) {
    return this.breedRepository.update(id, breedData);
  }

  delete(id: number) {
    return this.breedRepository.delete(id);
  }
}
