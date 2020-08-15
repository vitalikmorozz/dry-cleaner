import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    price: number;
}

export class UpdateOrderDto {
    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    statusDetails: string;

    @IsString()
    @IsOptional()
    statusDescription: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateServiceDto)
    service: UpdateServiceDto;
}
