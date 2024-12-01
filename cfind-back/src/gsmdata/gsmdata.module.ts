import { Module } from '@nestjs/common';
import { GsmdataService } from './gsmdata.service';
import { GsmdataController } from './gsmdata.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GsmdataController],
  providers: [GsmdataService, PrismaService],
})
export class GsmdataModule {}
