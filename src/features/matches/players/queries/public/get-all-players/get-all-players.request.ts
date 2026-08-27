import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

enum GetAllPlayersOrder {
  classic = 'classic',
  rapid = 'rapid',
  blitz = 'blitz'
}

export class GetAllPlayersRequest extends PaginationFilters {
  @IsOptional()
  @IsEnum(GetAllPlayersOrder)
  @ApiProperty({ required: false, enum: GetAllPlayersOrder })
  orderBy?: GetAllPlayersOrder;
}

