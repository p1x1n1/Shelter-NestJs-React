import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { PetModule } from '../pet/pet.module';
import { ClientModule } from '../client/client.module';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
  imports: [
    TypeOrmModule.forFeature([Contract]),
    PetModule,
    ClientModule,
  ]
})
export class ContractModule {}
