import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BookFilters } from '@/features/library/filters/book.filters';
import { BookPublicService } from '@/features/library/services/book/book.public.service';
import { CurrentUser } from '@/core/decorators/current-user.decorator';
import type { JwtPayload } from '@/core/jwt-payload.interface';

@ApiTags('Book - Public')
@ApiBearerAuth()
@Controller('public/book')
export class BookPublicController {
  constructor(private readonly service: BookPublicService) {
  }

  @Get()
  async getAll(@Query() filters: BookFilters, @CurrentUser() user: JwtPayload) {
    return await this.service.getAll(filters, user);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}