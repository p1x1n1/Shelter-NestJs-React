import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20) // Ограничение на длину логина
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100) // Ограничение на длину пароля
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50) // Ограничение на длину имени
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50) // Ограничение на длину фамилии
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50) // Ограничение на длину отчества
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber(null) // Можно указать код страны, если требуется
  @IsNotEmpty()
  phone: string;
}
