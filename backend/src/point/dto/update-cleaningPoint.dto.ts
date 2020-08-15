import {
    IsNotEmpty,
    IsString,
    IsArray,
    IsOptional,
    ValidateNested,
    IsInt,
    ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    price: number;
}

export class UpdateCleaningPointDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => UpdateServiceDto)
    services: UpdateServiceDto[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({
        each: true,
    })
    gallery: string[];
}
