import { Allow, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CourseCreateAdminDto {
  @IsInt()
  @ApiProperty()
  authorId!: number;

  @IsInt()
  @ApiProperty()
  categoryId!: number;

  @IsInt()
  @ApiProperty()
  languageId!: number;

  @IsInt()
  @ApiProperty()
  difficultyId!: number;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  title!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: string;

  @IsNumber()
  @ApiProperty()
  price!: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  newPrice?: number;
}