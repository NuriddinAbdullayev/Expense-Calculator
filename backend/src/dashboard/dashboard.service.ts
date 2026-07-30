import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: number) {
    const [
      incomes,
      expenses,
      incomeCount,
      expenseCount,
      categoryCount,
      latestExpenses,
      latestIncomes,
    ] = await Promise.all([
      this.prisma.income.findMany({
        where: { userId },
      }),

      this.prisma.expense.findMany({
        where: { userId },
      }),

      this.prisma.income.count({
        where: { userId },
      }),

      this.prisma.expense.count({
        where: { userId },
      }),

      this.prisma.category.count({
        where: { userId },
      }),

      this.prisma.expense.findMany({
        where: { userId },
        include: {
          category: true,
        },
        orderBy: {
          date: 'desc',
        },
        take: 5,
      }),

      this.prisma.income.findMany({
        where: { userId },
        orderBy: {
          date: 'desc',
        },
        take: 5,
      }),
    ]);

    const totalIncome = incomes.reduce(
      (sum, income) => sum + Number(income.amount),
      0,
    );

    const totalExpense = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );

    return {
      balance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      incomeCount,
      expenseCount,
      categoryCount,
      latestExpenses,
      latestIncomes,
    };
  }
}