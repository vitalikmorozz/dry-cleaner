import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    balance: number;

    @Prop([String])
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
