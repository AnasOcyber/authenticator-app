import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Role } from 'src/interfaces/role.interface';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop()
  userPassword: string;

  @Prop()
  userSalt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: Types.ObjectId;

  @Prop()
  roles: Role[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
