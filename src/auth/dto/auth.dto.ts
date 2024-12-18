import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  isNumber,
  IsOptional,
  isString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString({ message: 'name must be a string' })
  @MinLength(2, { message: 'name must be at least 2 characters' })
  @MaxLength(20, { message: 'name must be at most 20 characters' })
  name: string;
  @IsNotEmpty()
  @IsString({ message: 'email must be a string' })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 2 characters' })
  @MaxLength(60, { message: 'password must be at most 20 characters' })
  password: string;
 
}
export class LoginDto {
  //     @IsNotEmpty()
  //   @IsString({ message: 'name must be a string' })
  //   @MinLength(2, { message: 'name must be at least 2 characters' })
  //   @MaxLength(20, { message: 'name must be at most 20 characters' })
  //   name: string;
  @IsNotEmpty()
  @IsString({ message: 'email must be a string' })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 2 characters' })
  @MaxLength(60, { message: 'password must be at most 20 characters' })
  password: string;
}
export class UpdateUserDataDto {
      @IsNotEmpty()
    @IsString({ message: 'name must be a string' })
    @MinLength(2, { message: 'name must be at least 2 characters' })
    @MaxLength(20, { message: 'name must be at most 20 characters' })
    name: string;
  @IsNotEmpty()
  @IsString({ message: 'email must be a string' })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsEnum([true, false], { message: 'active must be true or false' })
  active: Boolean;
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 6 characters' })
  @MaxLength(60, { message: 'password must be at most 60 characters' })
  password: string;
}
