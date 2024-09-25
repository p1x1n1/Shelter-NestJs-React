import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Query } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  findAll(@Query('login') login?: string) {
    return this.contractService.findAll(login);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contractService.findOne(id);
  }

  @Post()
  create(@Body() contractData: Partial<Contract>) {
    // console.log(contractData);
    return this.contractService.create(contractData);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() contractData: Partial<Contract>) {
    return this.contractService.update(id, contractData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.contractService.delete(id);
  }
}
