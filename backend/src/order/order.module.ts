import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }]),
    ],
    exports: [OrderService],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
