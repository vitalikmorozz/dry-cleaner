import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('/order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @Roles('ADMIN')
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get('/me')
    @Roles('USER')
    async getUserOrders(@Request() req: any): Promise<Order[]> {
        return this.orderService.findByUser(req.user.id);
    }

    @Get(':id')
    @Roles('USER')
    async findById(@Param('id') id: string): Promise<Order> {
        return this.orderService.findById(id);
    }

    @Post()
    @Roles('USER')
    async create(
        @Request() req: any,
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<Order> {
        return this.orderService.create(req.user.id, createOrderDto);
    }

    @Patch(':id')
    @Roles('USER')
    async updateById(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
        return this.orderService.updateById(id, updateOrderDto);
    }

    @Delete(':id')
    @Roles('USER')
    async deleteById(@Param('id') id: string): Promise<Order> {
        return this.orderService.deleteById(id);
    }
}
