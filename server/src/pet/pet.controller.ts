import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) {}

    @Get()
    findAll() {
        return this.petService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.petService.findOne(id);
    }

    @Post()
    create(@Body() petData: Partial<Pet>) {
        return this.petService.create(petData);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() petData: Partial<Pet>) {
        return this.petService.update(id, petData);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.petService.delete(id);
    }
}
