import { News } from '@/features/news/data/entities/news.entity';
import { NewsFilters } from '@/features/news/presentation/filters/news.filters';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';

export abstract class INewsRepository {
  abstract save(entity: News): Promise<News>;

  abstract getOneById(id: number): Promise<News | null>;

  abstract getAll(filters: NewsFilters): Promise<PaginatedResult>;

  abstract delete(entity: News): Promise<void>;
}