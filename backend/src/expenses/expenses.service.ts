import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateExpenseDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: dto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.expense.create({
      data: {
        amount: dto.amount,
        description: dto.description,
        date: new Date(dto.date),
        categoryId: dto.categoryId,
        userId,
      },
    });
  }

  findAll(userId: number, filter: FilterExpenseDto) {
    const where: any = {
      userId,
    };

    if (filter.categoryId) {
      where.categoryId = filter.categoryId;
    }

    if (filter.from || filter.to) {
      where.date = {};

      if (filter.from) {
        where.date.gte = new Date(filter.from);
      }

      if (filter.to) {
        where.date.lte = new Date(filter.to);
      }
    }

    return this.prisma.expense.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        date: filter.sort,
      },
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
    });
  }

  async findOne(userId: number, id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.userId !== userId) {
      throw new ForbiddenException();
    }

    return expense;
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateExpenseDto,
  ) {
    await this.findOne(userId, id);

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: dto.categoryId,
        },
      });

      if (!category || category.userId !== userId) {
        throw new ForbiddenException();
      }
    }

    return this.prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...dto,
        ...(dto.date && { date: new Date(dto.date) }),
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);

    return this.prisma.expense.delete({
      where: {
        id,
      },
    });
  }
}