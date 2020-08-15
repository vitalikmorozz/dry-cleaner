import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        createdUser.balance = Math.ceil(Math.random() * 500);
        createdUser.roles = ['USER'];
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    async findOneById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userModel.findByIdAndUpdate(id, updateUserDto);
        return this.userModel.findById(id);
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }
}
