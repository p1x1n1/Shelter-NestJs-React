import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { DepartmentModule } from './department/department.module';
import { ContractModule } from './contract/contract.module';
import { ClientModule } from './client/client.module';
import { BreadModule } from './bread/bread.module';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { PetModule } from './pet/pet.module';
import { FamilyService } from './family/family.service';
import { FamilyModule } from './family/family.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { Client } from './client/client.entity';
import { Post } from './post/post.entity';
import { Status } from './status/status.entity';
import { Pet } from './pet/pet.entity';
import { Family } from './family/family.entity';
import { Employee } from './employee/employee.entity';
import { Contract } from './contract/contract.entity';
import { Breed } from './bread/bread.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '040104',
      database: 'shelter',
      entities:[Client,Post,Status,Pet,Family,Employee,Contract,Breed],
      autoLoadEntities: true,
      synchronize: true,
    }),
    StatusModule, DepartmentModule, ContractModule, ClientModule, BreadModule, EmployeeModule, PetModule, FamilyModule, PostModule, AuthModule],
  controllers: [AppController, EmployeeController, PostController],
  providers: [AppService],
})
export class AppModule {}
