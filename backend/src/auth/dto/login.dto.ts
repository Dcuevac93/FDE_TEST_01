import { IsEmail, IsString } from 'class-validator';

export class LoginPayloadDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
