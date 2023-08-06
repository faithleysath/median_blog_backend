import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty({ minLength: 5 })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  @IsNotEmpty()
  @ApiProperty({ required: false, maxLength: 300 })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
