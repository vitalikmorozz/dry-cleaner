import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Service {
    name: string;
    price: number;
}

@Schema()
export class Order extends Document {
    @Prop()
    userId: string;

    @Prop()
    creationDate: Date;

    @Prop()
    service: Service;

    @Prop()
    status: string;

    @Prop()
    statusDetails: string;

    @Prop()
    statusDescription: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
