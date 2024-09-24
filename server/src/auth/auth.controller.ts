import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";

@Controller('auth')
export class AuthController {
    constructor(private authSevice: AuthService) {}
    
    @Post('/login')
    login(@Body() userDto: LoginDto ){
        return this.authSevice.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: RegistrationDto ){
         return this.authSevice.registration(userDto);
    }

    @Get('user-info') 
    async getUserInfo(@Req() request) {
        const token = request.headers['authorization']?.split(' ')[1]; // Получаем токен из заголовка Authorization
        // console.log( request.headers);
        return this.authSevice.getUserInfo(token);
    }
    
}