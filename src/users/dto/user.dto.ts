import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends OmitType(CreateUserDto, ['password', 'salt']) {}
