import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BookDetailAdminDto {
  @ApiProperty()
  @Expose()
  id!: number;

  @ApiProperty()
  @Expose()
  author!: { id: number, fullName: string };

  @ApiProperty()
  @Expose()
  category!: { id: number, title: string };

  @ApiProperty()
  @Expose()
  language!: { id: number, title: string, code: string };

  @ApiProperty()
  @Expose()
  difficulty!: { id: number, title: string };

  @ApiProperty()
  @Expose()
  title!: string;

  @ApiProperty()
  @Expose()
  image?: string;

  @ApiProperty()
  @Expose()
  price!: number;

  @ApiProperty()
  @Expose()
  newPrice?: number;

  @ApiProperty()
  @Expose()
  pages!: number;

  @ApiProperty()
  @Expose()
  rating?: number;

  @ApiProperty()
  @Expose()
  reviewsCount!: number;

  @ApiProperty()
  @Expose()
  pubDate!: string;

  @ApiProperty()
  @Expose()
  isLiked!: boolean;

  @ApiProperty()
  @Expose()
  isInCart!: boolean;

  @ApiProperty()
  @Expose()
  created!: string;

  @ApiProperty()
  @Expose()
  updated?: string;
}