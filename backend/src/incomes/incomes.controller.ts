import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IncomesService } from './incomes.service';

import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('incomes')
@UseGuards(JwtAuthGuard)
export class IncomesController {
  constructor(
    private readonly incomesService: IncomesService,
  ) {}

  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateIncomeDto,
  ) {
    return this.incomesService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.incomesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.incomesService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIncomeDto,
  ) {
    return this.incomesService.update(
      req.user.id,
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.incomesService.remove(
      req.user.id,
      id,
    );
  }
}