import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsOptional,
    IsInt,
    IsArray,
    ArrayMinSize,
} from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsInt()
    @IsOptional()
    balance: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({
        each: true,
    })
    @IsOptional()
    roles: string[];
}
