import { IsNotEmpty, IsString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    price: number;
}

export class CreateOrderDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateServiceDto)
    service: CreateServiceDto;
}
