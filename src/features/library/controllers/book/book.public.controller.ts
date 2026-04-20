// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Controller, Get, Query } from '@nestjs/common';
// import { BookFilters } from '@/features/library/filters/book.filters';
//
// @ApiTags('Book - Public')
// @ApiBearerAuth()
// @Controller('public/book')
// export class BookPublicController {
//   constructor(private readonly service: BookPublicService) {
//   }
//
//   @Get()
//   async getAll(@Query() filters: BookFilters) {
//     return await this.service.getAll(filters);
//   }
// }