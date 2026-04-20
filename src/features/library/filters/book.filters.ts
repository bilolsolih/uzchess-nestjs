import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookFilters extends PaginationFilters {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  languageId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  difficultyId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  rating?: number;
}