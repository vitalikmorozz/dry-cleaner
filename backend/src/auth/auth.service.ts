import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schemas';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async checkIfUserExists(email: string): Promise<User> {
        return this.usersService.findByEmail(email);
    }

    async validateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.checkIfUserExists(loginDto.email);
        if (user && compareSync(loginDto.password, user.password)) return user;
        return null;
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = {
            sub: user.id,
            username: user.name,
            roles: user.roles,
        };
        return { access_token: this.jwtService.sign(payload) };
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = hashSync(createUserDto.password, 10);
        return this.usersService.create(createUserDto);
    }
}
