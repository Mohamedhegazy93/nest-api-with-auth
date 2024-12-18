import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString({ message: 'subCategory must be a string' })
  @MinLength(2, { message: 'subCategory must be at least 2 characters' })
  @MaxLength(20, { message: 'subCategory must be at most 20 characters' })
  name: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  category: string;
}
