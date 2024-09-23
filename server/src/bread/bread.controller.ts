import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BreedService } from './bread.service';
import { Breed } from './bread.entity';

@Controller('breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  findAll() {
    return this.breedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedService.findOne(id);
  }

  @Post()
  create(@Body() breedData: Partial<Breed>) {
    return this.breedService.create(breedData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() breedData: Partial<Breed>) {
    return this.breedService.update(id, breedData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.breedService.delete(id);
  }
}
