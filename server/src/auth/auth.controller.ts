import { Body, Controller, Post } from "@nestjs/common";
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
}