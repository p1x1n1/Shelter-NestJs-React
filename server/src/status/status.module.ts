import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [StatusService],
  controllers: [StatusController],
  imports:[
    TypeOrmModule.forFeature([Status]), 
  ],
  exports: [StatusService],
})
export class StatusModule {}
