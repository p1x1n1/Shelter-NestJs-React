import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':login')
  findOne(@Param('login') login: string) {
    return this.employeeService.findOne(login);
  }

  @Post()
  create(@Body() employeeData: Partial<Employee>) {
    return this.employeeService.create(employeeData);
  }

  @Put(':login')
  update(@Param('login') login: string, @Body() employeeData: Partial<Employee>) {
    return this.employeeService.update(login, employeeData);
  }

  @Delete(':login')
  delete(@Param('login') login: string) {
    return this.employeeService.delete(login);
  }
}
