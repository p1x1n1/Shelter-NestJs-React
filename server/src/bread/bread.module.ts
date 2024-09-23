import { Module } from '@nestjs/common';
import { BreedController } from './bread.controller';
import { BreedService } from './bread.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './bread.entity';

@Module({
  controllers: [BreedController],
  providers: [BreedService],
  imports:[
    TypeOrmModule.forFeature([Breed]),  // Assuming Breed is your entity name and defined in your database schema.
  ],
  exports:[BreedService]
})
export class BreadModule {}
