import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: 'category must be a string' })
    @MinLength(2, { message: 'category must be at least 2 characters' })
    @MaxLength(20, { message: 'category must be at most 20 characters' })
    name:string
}
