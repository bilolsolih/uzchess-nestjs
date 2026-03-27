import { AuthorCreateAdminDto } from '@/features/common/dtos/author/admin/author.create.admin.dto';
import { Author } from '@/features/common/entities/author.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthorListAdminDto } from '@/features/common/dtos/author/admin/author.list.admin.dto';
import { AuthorUpdateAdminDto } from '@/features/common/dtos/author/admin/author.update.admin.dto';

@Injectable()
export class AuthorAdminService {
  async create(payload: AuthorCreateAdminDto) {
    const author = Author.create(payload as Author);
    await Author.save(author);
    return author;
  }

  async updateOne(id: number, payload: AuthorUpdateAdminDto) {
    /*
    payload ichida fullName kelishi aniq, chunki author ichida faqat bitta o'zgartirsa bo'ladigan field bor xolos
    */
    const author = await Author.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author with given id not found');
    }

    author.fullName = payload.fullName;
    await Author.save(author);
    return author;
  }


  async getAll() {
    const authors = await Author.find();
    return plainToInstance(AuthorListAdminDto, authors);
  }

  async deleteOne(id: number) {
    const author = await Author.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author with given id not found');
    }

    try {
      await Author.remove(author);
    } catch (exc) {
      throw new BadRequestException(`Author couldn't be deleted: ${exc}`);
    }
  }
}