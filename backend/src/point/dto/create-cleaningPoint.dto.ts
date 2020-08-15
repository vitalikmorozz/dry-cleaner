import {
    IsNotEmpty,
    IsString,
    IsInt,
    ValidateNested,
    IsArray,
    ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    price: number;
}

export class CreateCleaningPointDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateServiceDto)
    services: CreateServiceDto[];

    @IsArray()
    @ArrayMinSize(1)
    @IsString({
        each: true,
    })
    gallery: string[];
}
