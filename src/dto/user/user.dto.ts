import { Email } from 'src/schemas/email.schema';
import { PersonalInfo } from 'src/schemas/personal-info.schema';
import { Phone } from 'src/schemas/phone.schema';

export class UserDto {
  _id: any;

  personalInfo: PersonalInfo;

  phones: Phone[];

  emails: Email[];

  tags: string[];
}
