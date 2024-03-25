import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Email } from './email.schema';
import { PersonalInfo } from './personal-info.schema';
import { Phone } from './phone.schema';
import { Role } from './roles/roles.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: PersonalInfo })
  personalInfo: PersonalInfo;

  @Prop()
  password: string;

  @Prop()
  roles: Role[];

  @Prop()
  salt: string;

  @Prop({ type: [Phone] })
  phones: Phone[];

  @Prop({ type: [Email] })
  emails: Email[];

  @Prop([String])
  tags: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
