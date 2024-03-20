import { Email } from '../schemas/email.schema';
import { PersonalInfo } from '../schemas/personal-info.schema';
import { Phone } from '../schemas/phone.schema';

export class CreateUserDto {
  personalInfo: PersonalInfo;
  password: string;
  salt: string;
  phones: Phone[];
  emails: Email[];
  tags: string[];
}
