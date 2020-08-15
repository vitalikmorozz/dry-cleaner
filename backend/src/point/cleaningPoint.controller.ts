import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Res,
} from '@nestjs/common';
import { CleaningPointService } from './cleaningPoint.service';
import { CleaningPoint } from './schemas/cleaningPoint.scheme';
import { CreateCleaningPointDto } from './dto/create-cleaningPoint.dto';
import { UpdateCleaningPointDto } from './dto/update-cleaningPoint.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { memoryStorage } from 'multer';
import { Response } from 'express';

import { uploadImage } from './uploadFile';

@Controller('/cleaningPoint')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CleaningPointController {
    constructor(private readonly cleaningPointService: CleaningPointService) {}

    @Get()
    @Roles('USER')
    async findAll(): Promise<CleaningPoint[]> {
        return this.cleaningPointService.findAll();
    }

    @Get(':id')
    @Roles('USER')
    async findById(@Param('id') id: string): Promise<CleaningPoint> {
        return this.cleaningPointService.findById(id);
    }

    @Post()
    @Roles('ADMIN')
    async create(
        @Body() createCleaningPointDto: CreateCleaningPointDto,
    ): Promise<CleaningPoint> {
        return this.cleaningPointService.create(createCleaningPointDto);
    }

    @Patch(':id')
    @Roles('ADMIN')
    async updateById(
        @Param('id') id: string,
        @Body() updateCleaningPointDto: UpdateCleaningPointDto,
    ): Promise<CleaningPoint> {
        return this.cleaningPointService.updateById(id, updateCleaningPointDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    async deleteById(@Param('id') id: string): Promise<CleaningPoint> {
        return this.cleaningPointService.deleteById(id);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: memoryStorage(),
        }),
    )
    async uploadFile(@UploadedFile() file, @Res() res: Response) {
        console.log(file);
        return uploadImage(file, res);
    }
}
