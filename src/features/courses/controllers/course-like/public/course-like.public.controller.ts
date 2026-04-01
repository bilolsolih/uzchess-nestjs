import type { Request } from 'express';
import { Body, Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseLikePublicService } from '@/features/courses/services/course-like/course-like.public.service';
import { CourseLikeCreatePublicDto } from '@/features/courses/dtos/course-like/public/course-like.create.public.dto';
import { AuthenticationGuard } from '@/core/guards/authentication.guard';

@ApiTags('CourseLike - Public')
@ApiBearerAuth()
@Controller('public/course-like')
@UseGuards(AuthenticationGuard)
export class CourseLikePublicController {
  constructor(private readonly service: CourseLikePublicService) {
  }

  @Post(':courseId')
  async toggleLike(@Req() request: Request, @Param('courseId', ParseIntPipe) id: number) {
    // @ts-ignore
    return await this.service.toggleLike(id, request.user.id);
  }
}