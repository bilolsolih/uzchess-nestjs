import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CourseUpdateAdminDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  authorId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  languageId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  difficultyId?: number;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  image?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  newPrice?: number;
}