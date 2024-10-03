import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [PetController],
  imports:[
    TypeOrmModule.forFeature([Pet]),
    FilesModule,
  ],
  providers: [PetService],
  exports:[PetService]
})
export class PetModule {}
