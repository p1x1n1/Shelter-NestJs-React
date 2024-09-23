import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { ClientService } from '../client/client.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthService {
    constructor(private clientService: ClientService,
                private employeeService: EmployeeService,
                private jwtService: JwtService
    ){}
    
    async login(userDto: LoginDto){
        const user = this.validateUser(userDto);
        return this.generateToken(await user);
    }
    private async validateUser(userDto: LoginDto) {
        const user = await this.clientService.findOne(userDto.login);
        if (!user) throw new UnauthorizedException({message:'Пользователя с таким login не существует'})
        const passwordEquals = await bcrypt.compare(userDto.password,user.password);
        if (passwordEquals) return user;
        throw new UnauthorizedException({message:'Неккоректный пароль'})
    }

   
    async registration(userDto: RegistrationDto){
         const candidate1 = await this.clientService.findOne(userDto.login);
         const candidate2 = await this.employeeService.findOne(userDto.login);
         if (candidate1) {
            throw new HttpException('Пользователь с таким login уже существует!',HttpStatus.BAD_REQUEST);
         }
         const hashPassword = await bcrypt.hash(userDto.password,5);
         const user = await this.clientService.create({...userDto,password: hashPassword});
         return this.generateToken(user);
    }

    private async generateToken(user: RegistrationDto){
        const payload = { email: user.email, login: user.login};
        return {
            token: this.jwtService.sign(payload)
        }
    }
}