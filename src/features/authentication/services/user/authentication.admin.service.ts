import { UserCreateAdminDto } from '@/features/authentication/dtos/user/admin/user.create.admin.dto';
import { User } from '@/features/authentication/entities/user.entity';
import { ILike, Not } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import argon2 from 'argon2';
import { UserUpdateAdminDto } from '@/features/authentication/dtos/user/admin/user.update.admin.dto';
import { plainToInstance } from 'class-transformer';
import { UserListAdminDto } from '@/features/authentication/dtos/user/admin/user.list.admin.dto';

export class AuthenticationAdminService {
  async create(payload: UserCreateAdminDto, profileImage?: Express.Multer.File) {
    const alreadyExists = await User.countBy({ login: ILike(payload.login) });
    if (alreadyExists) {
      throw new BadRequestException('User with given login already exists');
    }

    const newUser = User.create(payload);

    if (profileImage) {
      newUser.profileImage = profileImage.path;
    }

    if (payload.password) {
      newUser.password = await argon2.hash(payload.password);
    }
    await User.save(newUser);
    return newUser;
  }

  async updateOne(id: number, payload: UserUpdateAdminDto, profileImage?: Express.Multer.File) {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    if (payload.login) {
      const alreadyExists = await User.countBy({ id: Not(user.id), login: ILike(payload.login) });
      if (alreadyExists) {
        throw new BadRequestException('Login already exists');
      }
    }

    Object.assign(
      user, Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
    );

    if (payload.password) {
      user.password = await argon2.hash(payload.password);
    }

    if (profileImage) {
      // TODO: eski rasm mavjud bo'lsa, o'chirib tashlaydigan qilish kerak
      user.profileImage = profileImage.path;
    }

    await User.save(user);
    return user;
  }

  async getAll() {
    const users = await User.find();
    return plainToInstance(UserListAdminDto, users);
  }

  async deleteOne(id: number) {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    await User.remove(user);
  }
}