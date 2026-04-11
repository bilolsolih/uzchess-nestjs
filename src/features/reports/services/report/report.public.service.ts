import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReportCreatePublicDto } from '@/features/reports/dtos/report/public/report.create.public.dto';
import { User } from '@/features/authentication/entities/user.entity';
import { ReportType } from '@/core/enums/report-type.enum';
import { BookReview } from '@/features/library/entities/book-review.entity';
import { CourseReview } from '@/features/courses/entities/course-review.entity';
import { ReportCategory } from '@/features/reports/entities/report-category.entity';
import { Report } from '@/features/reports/entities/report.entity';

@Injectable()
export class ReportPublicService {
  async create(userId: number, payload: ReportCreatePublicDto) {
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User does not exist anymore');
    }

    const category = await ReportCategory.findOneBy({ id: payload.categoryId });
    if (!category) {
      throw new NotFoundException('ReportCategory with given id not found');
    }

    let review: BookReview | CourseReview | null;
    if (payload.target === ReportType.Book) {
      review = await BookReview.findOneBy({ id: payload.targetId });
    } else {
      review = await CourseReview.findOneBy({ id: payload.targetId });
    }

    if (!review) {
      throw new NotFoundException('Review with given id not found');
    }

    const alreadyExists = await Report.findOneBy({
      userId: userId,
      targetId: payload.targetId,
      categoryId: payload.categoryId,
    });

    if (alreadyExists) {
      throw new ConflictException('Report already exists');
    }

    const newReport = Report.create({ ...payload, userId });
    await Report.save(newReport);
    return newReport;
  }
}