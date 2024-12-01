import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class gsmdataPaginationQueryDto{
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    readonly page?: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    readonly take?: number;
}