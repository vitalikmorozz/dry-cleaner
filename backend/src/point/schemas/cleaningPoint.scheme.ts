import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

class Service {
    name: string;
    price: number;
}

@Schema()
export class CleaningPoint extends Document {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop([Service])
    services: Service[];

    @Prop([String])
    gallery: string[];
}

export const CleaningPointSchema = SchemaFactory.createForClass(CleaningPoint);
