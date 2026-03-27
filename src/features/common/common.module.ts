import { Module } from '@nestjs/common';
import { AuthorAdminController } from '@/features/common/controllers/author/author.admin.controller';
import { AuthorAdminService } from '@/features/common/services/author/author.admin.service';
import { DifficultyAdminService } from '@/features/common/services/difficulty/difficulty.admin.service';
import { DifficultyAdminController } from '@/features/common/controllers/difficulty/difficulty.admin.controller';
import { LanguageAdminService } from '@/features/common/services/language/language.admin.service';
import { LanguagePublicService } from '@/features/common/services/language/language.public.service';

@Module({
  providers: [
    AuthorAdminService,
    DifficultyAdminService,
    LanguageAdminService,
    LanguagePublicService,
  ],
  controllers: [
    AuthorAdminController,
    DifficultyAdminController,
  ],
})
export class CommonModule {
}