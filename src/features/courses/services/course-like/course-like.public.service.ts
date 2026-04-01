import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@/features/authentication/entities/user.entity';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseLike } from '@/features/courses/entities/course-like.entity';

@Injectable()
export class CourseLikePublicService {
  async toggleLike(courseId: number, userId: number) {
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    const course = await Course.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException('Course with given id not found');
    }

    const like = await CourseLike.findOneBy({ userId, courseId });
    if (like) {
      await CourseLike.remove(like);
      return { message: 'Removed' };
    } else {
      const newLike = CourseLike.create({ userId: user.id, courseId: courseId });
      await CourseLike.save(newLike);
      return { message: 'Liked' };
    }
  }
}