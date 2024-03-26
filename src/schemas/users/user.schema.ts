import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Email } from './email.schema';
import { PersonalInfo } from './personal-info.schema';
import { Phone } from './phone.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  personalInfo: PersonalInfo;

  @Prop()
  phones: Phone[];

  @Prop()
  emails: Email[];

  @Prop()
  tags: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
