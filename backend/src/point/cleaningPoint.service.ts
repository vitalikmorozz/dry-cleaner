import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CleaningPoint } from './schemas/cleaningPoint.scheme';
import { CreateCleaningPointDto } from './dto/create-cleaningPoint.dto';
import { UpdateCleaningPointDto } from './dto/update-cleaningPoint.dto';

@Injectable()
export class CleaningPointService {
    constructor(
        @InjectModel('cleaningPoint')
        private readonly cleaningPointModel: Model<CleaningPoint>,
    ) {}

    async create(
        createCleaningPointDto: CreateCleaningPointDto,
    ): Promise<CleaningPoint> {
        const createdPoint = new this.cleaningPointModel(
            createCleaningPointDto,
        );
        return createdPoint.save();
    }

    async findAll(): Promise<CleaningPoint[]> {
        return this.cleaningPointModel.find();
    }

    async findById(id: string): Promise<CleaningPoint> {
        return this.cleaningPointModel.findById(id);
    }

    async updateById(
        id: string,
        updateCleaningPoint: UpdateCleaningPointDto,
    ): Promise<CleaningPoint> {
        await this.cleaningPointModel.findByIdAndUpdate(
            id,
            updateCleaningPoint,
        );
        return this.cleaningPointModel.findById(id);
    }

    async deleteById(id: string): Promise<CleaningPoint> {
        return this.cleaningPointModel.findByIdAndDelete(id);
    }
}
