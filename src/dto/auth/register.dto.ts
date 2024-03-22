import { IsObject, IsOptional, IsNotEmpty, IsArray } from 'class-validator';
import { Email } from 'src/schemas/email.schema';
import { PersonalInfo } from 'src/schemas/personal-info.schema';
import { Phone } from 'src/schemas/phone.schema';

export class RegisterDto {
  @IsObject()
  @IsOptional()
  personalInfo: PersonalInfo;

  @IsNotEmpty()
  password: string;

  salt: string;

  @IsArray()
  @IsOptional()
  phones: Phone[];

  @IsArray()
  @IsOptional()
  emails: Email[];

  @IsArray()
  @IsOptional()
  tags: string[];
}
