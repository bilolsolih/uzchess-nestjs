import { Language } from '@/features/common/entities/language.entity';
import { plainToInstance } from 'class-transformer';
import { LanguageListPublicDto } from '@/features/common/dtos/language/public/language.list.public.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LanguagePublicService {
  async getAll() {
    const languages = await Language.find();
    return plainToInstance(LanguageListPublicDto, languages);
  }
}