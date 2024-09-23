import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FamilyService } from './family.service';
import { Family } from './family.entity';

@Controller('families')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  findAll() {
    return this.familyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.familyService.findOne(id);
  }

  @Post()
  create(@Body() familyData: Partial<Family>) {
    return this.familyService.create(familyData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() familyData: Partial<Family>) {
    return this.familyService.update(id, familyData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.familyService.delete(id);
  }
}
