import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from '../employee/employee.module';
import { ClientModule } from '../client/client.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[
    forwardRef(()=>EmployeeModule),
    forwardRef(()=>ClientModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET4444',
      signOptions:{
        expiresIn: '2h',
      }
    })
  ]
})
export class AuthModule {}
