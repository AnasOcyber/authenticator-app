import { IsNotEmpty, IsString } from 'class-validator';
import { Email } from 'src/schemas/users/email.schema';
import { PersonalInfo } from 'src/schemas/users/personal-info.schema';
import { Phone } from 'src/schemas/users/phone.schema';

export class UserDto {
  personalInfo: PersonalInfo;

  phones: Phone[];

  emails: Email[];

  tags: string[];

  @IsNotEmpty()
  @IsString()
  password: string;
}
