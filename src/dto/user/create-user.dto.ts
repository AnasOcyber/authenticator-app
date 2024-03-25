import { IsNotEmpty } from 'class-validator';
import { Email } from 'src/schemas/email.schema';
import { PersonalInfo } from 'src/schemas/personal-info.schema';
import { Phone } from 'src/schemas/phone.schema';
import { Role } from 'src/utils/fetchRoles';

export class CreateUserDto {
  personalInfo: PersonalInfo;

  @IsNotEmpty()
  password: string;

  phones: Phone[];

  emails: Email[];

  tags: string[];

  @IsNotEmpty()
  roles: Role[];
}
