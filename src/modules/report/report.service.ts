import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  async createReport(createReport: CreateReportDto, user: User) {
    const report = this.reportRepo.create(createReport);
    report.user = user;
    return await this.reportRepo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportRepo.findOneBy({ id });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;

    return await this.reportRepo.save(report);
  }
}
