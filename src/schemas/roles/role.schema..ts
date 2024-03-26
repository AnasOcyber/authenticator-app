import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: Types.ObjectId;

  @Prop()
  roles: Role[];
}

export const RolesSchema = SchemaFactory.createForClass(Role);
