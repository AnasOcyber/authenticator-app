import { Types } from 'mongoose';
import { Role } from 'src/interfaces/role.interface';

export class AuthDto {
  userPassword: string;
  userSalt: string;
  userId: Types.ObjectId;
  roles: Role[];
}
