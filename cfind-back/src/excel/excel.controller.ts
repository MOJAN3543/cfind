import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('excel')
export class ExcelController {
    constructor(readonly excelService: ExcelService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createDataByExcel(@UploadedFile() file: Express.Multer.File){
        return this.excelService.createDataByExcel(file);
    }
}