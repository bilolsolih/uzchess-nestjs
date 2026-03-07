import {IsDateString, IsString, MaxLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class NewsCreateDtoAdmin {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  content!: string;

  @IsDateString()
  @ApiProperty()
  date!: string;
}