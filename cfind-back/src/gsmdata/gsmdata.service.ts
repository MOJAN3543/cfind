import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { gsmdataPaginationQueryDto } from './dto/gsmdata-pagination-query.dto';

@Injectable()
export class GsmdataService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createGsmdatumDto: Prisma.gsmdataCreateInput) {
    return this.prismaService.gsmdata.create({
      data: createGsmdatumDto,
    });
  }

  findByQuery(query: gsmdataPaginationQueryDto){
    const page = query.page ?? 1;
    const take = query.take ?? 100;
    return this.prismaService.gsmdata.findMany({
      skip: (page - 1) * take,
      take: take
    })
  }

  findAll() {
    return this.prismaService.gsmdata.findMany();
  }

  update(id: string, updateGsmdatumDto: Prisma.gsmdataUpdateInput) {
    return this.prismaService.gsmdata.update({
      where: {
        GSM_ID: id
      },
      data: updateGsmdatumDto,
    });
  }

  remove(id: string) {
    return this.prismaService.gsmdata.delete({
      where:{
        GSM_ID: id
      },
    });
  }
}
