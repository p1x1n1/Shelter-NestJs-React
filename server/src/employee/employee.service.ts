import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll() {
    return this.employeeRepository.find({ relations: ['post'] });
  }

  findOne(login: string) {
    return this.employeeRepository.findOneBy({ login });
  }

  create(employeeData: Partial<Employee>) {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  update(login: string, employeeData: Partial<Employee>) {
    return this.employeeRepository.update(login, employeeData);
  }

  delete(login: string) {
    return this.employeeRepository.delete(login);
  }
}
