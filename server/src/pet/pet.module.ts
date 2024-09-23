import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';

@Module({
  controllers: [PetController],
  imports:[
    TypeOrmModule.forFeature([Pet]) 
  ],
  providers: [PetService],
  exports:[PetService]
})
export class PetModule {}
