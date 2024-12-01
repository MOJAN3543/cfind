import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ExcelService, PrismaService],
  controllers: [ExcelController]
})
export class ExcelModule {}
