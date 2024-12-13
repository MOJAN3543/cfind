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
        const DataList: Prisma.gsmdataCreateManyInput[] = utils.sheet_to_json(sheet, {range: 1});
        DataList.forEach((Data) => {
            const NATable = ["NAA", "NAG", "NAN"];
            const ToStringTable = ["lvef", "age"]
            Object.entries(Data).forEach(([key, value]) => {
                if(value == 'NAA(adult)')
                    Data[key] = "adult";
                if(ToStringTable.includes(key))
                    Data[key] = Data[key].toString();
                if(NATable.includes(value))
                    Data[key] = "N/A";
            })
        })
        return this.prismaService.gsmdata.createMany({
            data: DataList,
            skipDuplicates: true
        })
    }
}