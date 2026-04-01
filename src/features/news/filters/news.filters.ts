import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewsFilters {
  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  search?: string;
}