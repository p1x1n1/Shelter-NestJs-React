import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contractService.findOne(id);
  }

  @Post()
  create(@Body() contractData: Partial<Contract>) {
    return this.contractService.create(contractData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() contractData: Partial<Contract>) {
    return this.contractService.update(id, contractData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.contractService.delete(id);
  }
}
