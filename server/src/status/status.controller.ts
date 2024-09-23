import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './status.entity';

@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statusService.findOne(id);
  }

  @Post()
  create(@Body() statusData: Partial<Status>) {
    return this.statusService.create(statusData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() statusData: Partial<Status>) {
    return this.statusService.update(id, statusData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.statusService.delete(id);
  }
}
