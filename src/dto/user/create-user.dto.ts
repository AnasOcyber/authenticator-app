import { Email } from 'src/schemas/email.schema';
import { PersonalInfo } from 'src/schemas/personal-info.schema';
import { Phone } from 'src/schemas/phone.schema';

export class CreateUserDto {
  _id: string;
  personalInfo: PersonalInfo;
  password: string;
  salt: string;
  phones: Phone[];
  emails: Email[];
  tags: string[];
}
