import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookCreateAdminDto {
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
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: string;

  @IsString()
  @ApiProperty()
  description!: string;

  @IsNumber()
  @ApiProperty()
  price!: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  newPrice?: number;

  @IsInt()
  @ApiProperty()
  pages!: number;

  @IsDateString()
  @ApiProperty()
  pubDate!: string;
}