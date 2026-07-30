import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
  ) {}

  @Get('summary')
  getSummary(@Req() req: any) {
    return this.statisticsService.getSummary(req.user.id);
  }

  @Get('category')
  getCategoryStatistics(@Req() req: any) {
    return this.statisticsService.getCategoryStatistics(
      req.user.id,
    );
  }

  @Get('monthly')
  getMonthlyStatistics(@Req() req: any) {
    return this.statisticsService.getMonthlyStatistics(
      req.user.id,
    );
  }
}