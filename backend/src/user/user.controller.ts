import {
    Controller,
    Get,
    Body,
    Post,
    Delete,
    Param,
    Patch,
    UseGuards,
    Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('/user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Roles('ADMIN')
    async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/me')
    @Roles('USER')
    async getUser(@Request() req: any): Promise<User> {
        return this.userService.findOneById(req.user.id);
    }

    @Get(':id')
    @Roles('USER')
    async getById(@Param('id') id: string): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Post()
    @Roles('ADMIN')
    async create(
        @Body() createUserDto: CreateUserDto,
    ): Promise<{ id: string }> {
        const user = await this.userService.create(createUserDto);
        return { id: user.id };
    }

    @Patch(':id')
    @Roles('USER')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }
}
