import { Module } from '@nestjs/common';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './family.entity';

@Module({
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
  imports: [
    TypeOrmModule.forFeature([Family])
  ],
})
export class FamilyModule {}
