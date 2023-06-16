import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  getEstimate(@Query() qs: GetEstimateDto) {
    console.log(qs);
    return 's';
  }

  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  @Post()
  createReport(
    @Body() createReport: CreateReportDto,
    @CurrentUser() user: User,
  ) {
    return this.reportService.createReport(createReport, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApproveReportDto,
  ) {
    return this.reportService.changeApproval(id, body.approved);
  }
}
