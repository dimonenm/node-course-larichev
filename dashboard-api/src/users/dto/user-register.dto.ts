import { IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString({ message: 'Не указан email' })
  email: string;

  @IsString({ message: 'Не указан пароль' })
  password: string;

  @IsString({ message: 'Не указано имя' })
  name: string;
}
