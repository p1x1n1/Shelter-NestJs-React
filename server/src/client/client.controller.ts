import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':login')
  findOne(@Param('login') login: string) {
    return this.clientService.findOne(login);
  }

  @Post()
  create(@Body() clientData: Partial<Client>) {
    return this.clientService.create(clientData);
  }

  @Put(':login')
  update(@Param('login') login: string, @Body() clientData: Partial<Client>) {
    return this.clientService.update(login, clientData);
  }

  @Delete(':login')
  delete(@Param('login') login: string) {
    return this.clientService.delete(login);
  }
}
