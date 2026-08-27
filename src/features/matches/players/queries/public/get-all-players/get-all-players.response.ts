import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class CountryInPlayerListDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  flag!: string;
}


export class PlayerListDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  image?: string;

  @Expose()
  @ApiProperty()
  classic?: number;

  @Expose()
  @ApiProperty()
  rapid?: number;

  @Expose()
  @ApiProperty()
  blitz?: number;

  @Expose()
  @ApiProperty()
  @Type(() => CountryInPlayerListDto)
  country!: CountryInPlayerListDto;
}