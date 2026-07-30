import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, CategoriesModule, IncomesModule, ExpensesModule, DashboardModule, StatisticsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
