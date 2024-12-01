import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { read, utils } from 'xlsx';

@Injectable()
export class ExcelService {
    constructor(private readonly prismaService: PrismaService) {}
    async createDataByExcel(file: Express.Multer.File){
        const workbook = read(file.buffer, {type: "buffer"});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const Data: Prisma.gsmdataCreateManyInput[] = utils.sheet_to_json(sheet, {range: 1});
        return this.prismaService.gsmdata.createMany({
            data: Data,
            skipDuplicates: true
        })
    }
}