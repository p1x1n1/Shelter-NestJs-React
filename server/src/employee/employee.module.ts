import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers:[EmployeeService],
    controllers:[EmployeeController],
    imports: [
        TypeOrmModule.forFeature([Employee]),
        AuthModule
    ],
    exports: [EmployeeService]
})
export class EmployeeModule {}
