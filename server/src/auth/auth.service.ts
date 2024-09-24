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
        const user = await this.validateUser(userDto);
        const {token} = await this.generateToken(await user);
        return {token, user}
    }
    private async validateUser(userDto: LoginDto) {
        // Ищем пользователя в таблице клиентов
        const user = await this.clientService.findOne(userDto.login);
    
        if (user) {
            // Проверяем пароль клиента
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            } else {
                throw new UnauthorizedException({ message: 'Некорректный пароль' });
            }
        }
    
        // Если пользователя в таблице клиентов нет, ищем его в таблице сотрудников
        const employee = await this.employeeService.findOne(userDto.login);
    
        if (employee) {
            // Проверяем пароль сотрудника
            const passwordEquals = await bcrypt.compare(userDto.password, employee.password);
            if (passwordEquals) {
                return employee;
            } else {
                throw new UnauthorizedException({ message: 'Некорректный пароль' });
            }
        }
    
        // Если не найден ни клиент, ни сотрудник
        throw new UnauthorizedException({ message: 'Пользователя с таким login не существует' });
    }
    

   
    async registration(userDto: RegistrationDto){
         const candidate1 = await this.clientService.findOne(userDto.login);
         const candidate2 = await this.employeeService.findOne(userDto.login);
         if (candidate1 || candidate2) {
            throw new HttpException('Пользователь с таким login уже существует!',HttpStatus.BAD_REQUEST);
         }
         const hashPassword = await bcrypt.hash(userDto.password,5);
         const user = await this.clientService.create({...userDto,password: hashPassword});
         const {token} = await this.generateToken(await user);
         return {token, user}
    }

    private async generateToken(user: RegistrationDto){
        const payload = { email: user.email, login: user.login};
        return {
            token: this.jwtService.sign(payload)
        }
    }


    async getUserInfo(token: string) {
        let userId;
        try {
            const decoded = this.jwtService.verify(token);
            userId = decoded.login; // Или другой идентификатор пользователя из токена
        } catch (e) {
            throw new UnauthorizedException('Неверный токен');
        }

        const user = await this.clientService.findOne(userId) || await this.employeeService.findOne(userId);

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        return user; // Вернуть информацию о пользователе
    }
    


}