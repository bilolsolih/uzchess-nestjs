import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { CourseCreateAdminDto } from '@/features/courses/dtos/course/admin/course.create.admin.dto';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseUpdateAdminDto } from '@/features/courses/dtos/course/admin/course.update.admin.dto';
import { CourseListAdminDto } from '@/features/courses/dtos/course/admin/course.list.admin.dto';
import { Author } from '@/features/common/entities/author.entity';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import { Language } from '@/features/common/entities/language.entity';
import { Difficulty } from '@/features/common/entities/difficulty.entity';

@Injectable()
export class CourseAdminService {
  async create(payload: CourseCreateAdminDto, image: Express.Multer.File) {
    const course = Course.create(payload as Course);
    course.image = image.path;

    const authorExists = await Author.countBy({ id: payload.authorId });
    if (!authorExists) {
      throw new NotFoundException('Author with given id not found');
    }

    const categoryExists = await CourseCategory.countBy({ id: payload.authorId });
    if (!categoryExists) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    const languageExists = await Language.countBy({ id: payload.languageId });
    if (!languageExists) {
      throw new NotFoundException('Language with given id not found');
    }

    const difficultyExists = await Difficulty.countBy({ id: payload.difficultyId });
    if (!difficultyExists) {
      throw new NotFoundException('Difficulty with given id not found');
    }

    await Course.save(course);
    return course;
  }

  async updateOne(id: number, payload: CourseUpdateAdminDto, image?: Express.Multer.File) {
    const course = await Course.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course with given id not found');
    }

    if (payload.authorId) {
      const authorExists = await Author.countBy({ id: payload.authorId });
      if (!authorExists) {
        throw new NotFoundException('Author with given id not found');
      }
      course.authorId = payload.authorId;
    }

    if (payload.categoryId) {
      const categoryExists = await CourseCategory.countBy({ id: payload.authorId });
      if (!categoryExists) {
        throw new NotFoundException('CourseCategory with given id not found');
      }
      course.categoryId = payload.categoryId;
    }

    if (payload.languageId) {
      const languageExists = await Language.countBy({ id: payload.languageId });
      if (!languageExists) {
        throw new NotFoundException('Language with given id not found');
      }
      course.languageId = payload.languageId;
    }

    if (payload.difficultyId) {
      const difficultyExists = await Difficulty.countBy({ id: payload.difficultyId });
      if (!difficultyExists) {
        throw new NotFoundException('Difficulty with given id not found');
      }
      course.difficultyId = payload.difficultyId;
    }

    Object.assign(
      course,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
    );

    if (image) {
      course.image = image.path;
    }
    await Course.save(course);
    return course;
  }

  async getAll(userId?: number) {
    const courses = await Course.createQueryBuilder('courses')
      .leftJoinAndSelect('courses.likes', 'likes', 'likes.userId = :userId', { userId: userId })
      .leftJoinAndSelect('courses.author', 'author')
      .leftJoinAndSelect('courses.category', 'category')
      .leftJoinAndSelect('courses.difficulty', 'difficulty')
      .leftJoinAndSelect('courses.language', 'language')
      .getMany();

    if (userId) {
      for (const course of courses) {
        // @ts-ignore
        course.isLiked = Boolean(course.likes?.length);
      }
    }

    return plainToInstance(CourseListAdminDto, courses, { excludeExtraneousValues: true });
  }

  // async deleteOne(id: number) {
  //   const course = await Course.findOneBy({ id });
  //   if (!course) {
  //     throw new NotFoundException('Course with given id not found');
  //   }
  //
  //   try {
  //     await Course.remove(course);
  //   } catch (exc) {
  //     throw new BadRequestException(`Course couldn't be deleted: ${exc}`);
  //   }
  // }
}