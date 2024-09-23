import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  findAll() {
    return this.clientRepository.find({ relations: ['contracts'] });
  }

  findOne(login: string) {
    return this.clientRepository.findOneBy({ login });
  }

  create(clientData: Partial<Client>) {
    const client = this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  update(login: string, clientData: Partial<Client>) {
    return this.clientRepository.update(login, clientData);
  }

  delete(login: string) {
    return this.clientRepository.delete(login);
  }
}
