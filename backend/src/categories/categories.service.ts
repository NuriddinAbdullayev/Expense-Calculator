import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(userId: number, id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return category;
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateCategoryDto,
  ) {
    await this.findOne(userId, id);

    return this.prisma.category.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}