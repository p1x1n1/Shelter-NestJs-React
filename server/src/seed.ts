import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Post } from './post/post.entity';
import { Employee } from './employee/employee.entity';
import { Status } from './status/status.entity';
import { Family } from './family/family.entity';

@Injectable()
export class SeedService {
  constructor(private readonly connection: Connection) {}

  async run() {
    await this.createPosts();
    await this.createEmployees();
    await this.createStatuses();
    await this.createFamilies();
  }

  private async createPosts() {
    const postRepo = this.connection.getRepository(Post);
    
    const existingPost = await postRepo.findOne({ where: { name: 'Админ' } });
    if (!existingPost) {
      const post = postRepo.create({ id: 1, name: 'Админ' });
      await postRepo.save(post);
      console.log('Post seeded');
    } else {
      console.log('Post already exists');
    }
  }

  private async createEmployees() {
    const employeeRepo = this.connection.getRepository(Employee);
    const postRepo = this.connection.getRepository(Post);
    
    const adminPost = await postRepo.findOne({ where: { name: 'Админ' } });
    
    const existingEmployee = await employeeRepo.findOne({ where: { login: 'admin' } });
    if (!existingEmployee) {
      const employee = employeeRepo.create({
        login: 'admin',
        password: '$2a$05$9AK6e1ZMqbKyNNr/wMWZPevoJ5UszIzFfGAA0oWuVLh779RDzmG.G',
        name: 'admin',
        lastname: 'admin',
        surname: 'admin',
        email: 'admin@gmail.com',
        phone: '89171605809',
        post: adminPost,
      });

      await employeeRepo.save(employee);
      console.log('Employee seeded');
    } else {
      console.log('Employee already exists');
    }
  }

  private async createStatuses() {
    const statusRepo = this.connection.getRepository(Status);
    
    const statuses = [
      { id: 1, name: 'Забронирован' },
      { id: 2, name: 'Ожидает семью' },
      { id: 3, name: 'Нашёл семью' },
    ];

    for (const status of statuses) {
      const existingStatus = await statusRepo.findOne({ where: { name: status.name } });
      if (!existingStatus) {
        await statusRepo.save(status);
        console.log(`Status ${status.name} seeded`);
      } else {
        console.log(`Status ${status.name} already exists`);
      }
    }
  }

  private async createFamilies() {
    const familyRepo = this.connection.getRepository(Family);
    
    const families = [
      { id: 1, name: 'Кошачьи' },
      { id: 2, name: 'Собачьи' },
    ];

    for (const family of families) {
      const existingFamily = await familyRepo.findOne({ where: { name: family.name } });
      if (!existingFamily) {
        await familyRepo.save(family);
        console.log(`Family ${family.name} seeded`); 
      } else {
        console.log(`Family ${family.name} already exists`);
      }
    }
  }
}
