import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    private fileService: FilesService
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

  async create(petData: Partial<Pet>, image?: any) {
    const fileName = await this.fileService.createFile(image);
    if (typeof petData.vaccinationStatus === 'string') {
      petData.vaccinationStatus = petData.vaccinationStatus === 'true';
    }
    if (typeof petData.sterilization === 'string') {
        petData.sterilization = petData.sterilization === 'true';
    }
    if (typeof petData.sex === 'string') {
        petData.sex = petData.sex === 'true';  
    }
    console.log(petData);
    const pet = this.petRepository.create({...petData, photo: fileName});
    return this.petRepository.save(pet);
  }

  async update(id: number, petData: Partial<Pet>, image?: any) {
    const pet = await this.petRepository.findBy({id});
    console.log(petData, pet )
    if (typeof petData.vaccinationStatus === 'string') {
      petData.vaccinationStatus = petData.vaccinationStatus === 'true';
    }
    if (typeof petData.sterilization === 'string') {
        petData.sterilization = petData.sterilization === 'true';
    }
    if (typeof petData.sex === 'string') {
        petData.sex = petData.sex === 'true';  
    }
    console.log(petData);
    if (image) {
      const oldFileName = pet[0].photo;
      this.fileService.deleteFile(oldFileName);
      const fileName = await this.fileService.createFile(image);
      return this.petRepository.update(id, {...petData,photo: fileName})
    }
    return this.petRepository.update(id, petData);
  }

  async delete(id: number) {
    const pet = await this.petRepository.findBy({id});
    const oldFileName = pet[0].photo;
    this.fileService.deleteFile(oldFileName);
    return this.petRepository.delete(id);
  }
}
