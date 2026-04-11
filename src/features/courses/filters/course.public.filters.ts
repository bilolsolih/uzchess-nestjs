import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';

export class CoursePublicFilters extends PaginationFilters {
  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;
}