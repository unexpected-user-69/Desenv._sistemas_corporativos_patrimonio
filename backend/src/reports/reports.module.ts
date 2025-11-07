import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportRequest } from './entities/report-request.entity';
import { ReportArtifact } from './entities/report-artifact.entity';
import { CsvGeneratorService } from './services/csv-generator.service';
import { PdfGeneratorService } from './services/pdf-generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportRequest, ReportArtifact])],
  controllers: [ReportsController],
  providers: [ReportsService, CsvGeneratorService, PdfGeneratorService],
  exports: [ReportsService],
})
export class ReportsModule {}

