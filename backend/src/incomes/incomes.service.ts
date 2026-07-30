import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, dto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: {
        amount: dto.amount,
        source: dto.source,
        description: dto.description,
        date: new Date(dto.date),
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.income.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(userId: number, id: number) {
    const income = await this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new NotFoundException('Income not found');
    }

    if (income.userId !== userId) {
      throw new ForbiddenException();
    }

    return income;
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateIncomeDto,
  ) {
    await this.findOne(userId, id);

    return this.prisma.income.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.date && { date: new Date(dto.date) }),
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);

    return this.prisma.income.delete({
      where: { id },
    });
  }
}