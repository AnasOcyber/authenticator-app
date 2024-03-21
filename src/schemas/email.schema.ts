import { Optional } from '@nestjs/common';
import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Email {
  @Prop()
  identifier: string;

  @Prop()
  @Optional()
  isVerified: boolean;

  @Prop([String])
  tags: string[];
}
