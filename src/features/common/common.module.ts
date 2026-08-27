import { Module } from '@nestjs/common';
import { AuthorAdminController } from '@/features/common/controllers/author/author.admin.controller';
import { AuthorAdminService } from '@/features/common/services/author/author.admin.service';
import { DifficultyAdminService } from '@/features/common/services/difficulty/difficulty.admin.service';
import { DifficultyAdminController } from '@/features/common/controllers/difficulty/difficulty.admin.controller';
import { LanguageAdminService } from '@/features/common/services/language/language.admin.service';
import { LanguagePublicService } from '@/features/common/services/language/language.public.service';
import { LanguageAdminController } from '@/features/common/controllers/language/language.admin.controller';
import { LanguagePublicController } from '@/features/common/controllers/language/language.public.controller';
import { AuthorRepository } from '@/features/common/repositories/author.repository';
import { CountryRepository } from '@/features/common/repositories/country.repository';
import { DifficultyRepository } from '@/features/common/repositories/difficulty.repository';
import { LanguageRepository } from '@/features/common/repositories/language.repository';
import { TermsRepository } from '@/features/common/repositories/terms.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '@/features/common/entities/author.entity';
import { Country } from '@/features/common/entities/country.entity';
import { Difficulty } from '@/features/common/entities/difficulty.entity';
import { Language } from '@/features/common/entities/language.entity';
import { Terms } from '@/features/common/entities/terms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Country, Difficulty, Language, Terms])],
  exports: [AuthorRepository, DifficultyRepository, LanguageRepository],
  providers: [
    AuthorRepository,
    CountryRepository,
    DifficultyRepository,
    LanguageRepository,
    TermsRepository,
    AuthorAdminService,
    DifficultyAdminService,
    LanguageAdminService,
    LanguagePublicService,
  ],
  controllers: [
    AuthorAdminController,
    DifficultyAdminController,
    LanguageAdminController,
    LanguagePublicController,
  ],
})
export class CommonModule {
}