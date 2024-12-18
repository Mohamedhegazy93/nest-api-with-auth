import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    minlength: [2, 'User name is very short'],
    maxlength: [20, 'User name is very long'],
    type: String,
  })
  name: string;
  @Prop({
    required: true,
    type: String,
    unique:true
  })
  email: string;
  @Prop({
    required: true,
    type:String,
    minlength: [6, 'password is very short'],
    maxlength: [60, 'password is very long'],
  })
  password: string;
  @Prop({
    default:true,
    type: Boolean,
  })
  active: boolean;
  @Prop({
    default:'user',
    enum:['user','admin'],
    type: String,
  })
  role: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);

