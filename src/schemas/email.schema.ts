import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Email {
  @Prop()
  identifier: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop([String])
  tags: string[];
}

export const EmailSchema = SchemaFactory.createForClass(Email);
