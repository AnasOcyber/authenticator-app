import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Mongoose, ObjectId } from 'mongoose';
import { Email } from 'src/schemas/email.schema';
import { PersonalInfo } from 'src/schemas/personal-info.schema';
import { Phone } from 'src/schemas/phone.schema';

export class CreateUserDto {
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
