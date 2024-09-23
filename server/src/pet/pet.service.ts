import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  findAll() {
    return this.petRepository.find({
      relations: ['breed', 'adoptionStatus'],
    });
  }

  findOne(id: number) {
    return this.petRepository.findOne({
      where: { id },
      relations: ['breed', 'adoptionStatus'],
    });
  }

  create(petData: Partial<Pet>) {
    const pet = this.petRepository.create(petData);
    return this.petRepository.save(pet);
  }

  update(id: number, petData: Partial<Pet>) {
    return this.petRepository.update(id, petData);
  }

  delete(id: number) {
    return this.petRepository.delete(id);
  }
}
