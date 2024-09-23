import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
  imports: [
    TypeOrmModule.forFeature([Contract])
  ]
})
export class ContractModule {}
