import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class PersonalInfo {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}
