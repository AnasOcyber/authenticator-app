import { Optional } from '@nestjs/common';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Phone {
  @Prop()
  identifier: string;

  @Prop()
  @Optional()
  isVerified: boolean;

  @Prop([String])
  tags: string[];
}
