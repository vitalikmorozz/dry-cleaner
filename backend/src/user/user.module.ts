import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    ],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
