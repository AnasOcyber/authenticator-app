import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Phone {
  @Prop()
  identifier: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop([String])
  tags: string[];
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
