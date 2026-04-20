import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookUpdateAdminDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  authorId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  languageId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  difficultyId?: number;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @ApiProperty({ required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  price?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  newPrice?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  pages?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  pubDate?: string;
}