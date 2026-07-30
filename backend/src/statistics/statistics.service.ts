import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: number) {
    const incomes = await this.prisma.income.findMany({
      where: {
        userId,
      },
    });

    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
      },
    });

    const totalIncome = incomes.reduce(
      (sum, income) => sum + Number(income.amount),
      0,
    );

    const totalExpense = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      incomeCount: incomes.length,
      expenseCount: expenses.length,
    };
  }

  async getCategoryStatistics(userId: number) {
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
    });

    const result: Record<
      string,
      {
        total: number;
        count: number;
      }
    > = {};

    for (const expense of expenses) {
      const name = expense.category.name;

      if (!result[name]) {
        result[name] = {
          total: 0,
          count: 0,
        };
      }

      result[name].total += Number(expense.amount);
      result[name].count++;
    }

    return Object.entries(result).map(([category, value]) => ({
      category,
      total: value.total,
      count: value.count,
    }));
  }

  async getMonthlyStatistics(userId: number) {
    const incomes = await this.prisma.income.findMany({
      where: {
        userId,
      },
    });

    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
      },
    });

    const months: Record<
      string,
      {
        income: number;
        expense: number;
      }
    > = {};

    for (const income of incomes) {
      const key = income.date.toISOString().slice(0, 7);

      if (!months[key]) {
        months[key] = {
          income: 0,
          expense: 0,
        };
      }

      months[key].income += Number(income.amount);
    }

    for (const expense of expenses) {
      const key = expense.date.toISOString().slice(0, 7);

      if (!months[key]) {
        months[key] = {
          income: 0,
          expense: 0,
        };
      }

      months[key].expense += Number(expense.amount);
    }

    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
        balance: data.income - data.expense,
      }));
  }
}