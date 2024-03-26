import { Types } from 'mongoose';
import { Role } from 'src/interfaces/role.interface';

export class RolesDto {
  password: string;
  salt: string;
  userId: Types.ObjectId;
  roles: Role[];
}
