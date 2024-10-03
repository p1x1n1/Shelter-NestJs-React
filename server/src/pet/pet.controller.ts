import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() petData: Partial<Pet>, @UploadedFile() image) {
        console.log(petData,'image',image);
        return this.petService.create(petData,image);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    update(@Param('id') id: number, @Body() petData: Partial<Pet>, @UploadedFile() image) {
        return this.petService.update(id, petData,image);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.petService.delete(id);
    }
}
