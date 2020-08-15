import {
    Controller,
    Post,
    ForbiddenException,
    Body,
    ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        const user = await this.authService.validateUser(loginDto);
        if (!user)
            throw new ForbiddenException('Email or password is incorrect');
        return this.authService.login(user);
    }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto): Promise<any> {
        const user = await this.authService.checkIfUserExists(
            createUserDto.email,
        );
        if (user)
            throw new ConflictException('User with that email already exists');
        const createdUser = await this.authService.register(createUserDto);
        return this.authService.login(createdUser);
    }
}
