import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CleaningPointService } from './cleaningPoint.service';
import { CleaningPointSchema } from './schemas/cleaningPoint.scheme';
import { CleaningPointController } from './cleaningPoint.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'cleaningPoint', schema: CleaningPointSchema },
        ]),
    ],
    exports: [CleaningPointService],
    controllers: [CleaningPointController],
    providers: [CleaningPointService],
})
export class CleaningPointModule {}
