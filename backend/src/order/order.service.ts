import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('order') private readonly orderModel: Model<Order>,
    ) {}

    async create(
        userId: string,
        createOrderDto: CreateOrderDto,
    ): Promise<Order> {
        const createdOrder = new this.orderModel(createOrderDto);
        createdOrder.userId = userId;
        createdOrder.creationDate = new Date();
        createdOrder.status = 'pending';
        createdOrder.statusDetails = 'new';
        createdOrder.statusDescription = '';
        return createdOrder.save();
    }

    async findByUser(userId: string): Promise<Order[]> {
        return this.orderModel.find({ userId });
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find();
    }

    async findById(id: string): Promise<Order> {
        return this.orderModel.findById(id);
    }

    async updateById(
        id: string,
        updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
        await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
        return this.findById(id);
    }

    async deleteById(id: string): Promise<Order> {
        return this.orderModel.findByIdAndDelete(id);
    }
}
