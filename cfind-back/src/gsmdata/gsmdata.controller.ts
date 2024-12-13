import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GsmdataService } from './gsmdata.service';
import { Prisma } from '@prisma/client';
import { gsmdataPaginationQueryDto } from './dto/gsmdata-pagination-query.dto';
@Controller('gsmdata')
export class GsmdataController {
  constructor(private readonly gsmdataService: GsmdataService) {}

  @Post()
  create(@Body() createGsmdatumDto: Prisma.gsmdataCreateInput) {
    return this.gsmdataService.create(createGsmdatumDto);
  }

  @Get('/query')
  findByQuery(@Query() query: gsmdataPaginationQueryDto){
    return this.gsmdataService.findByQuery(query);
  }

  @Get()
  findAll() {
    return this.gsmdataService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGsmdatumDto: Prisma.gsmdataUpdateInput) {
    return this.gsmdataService.update(id, updateGsmdatumDto);
  }

  @Delete()
  removeAll(){
    return this.gsmdataService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gsmdataService.remove(id);
  }
}
