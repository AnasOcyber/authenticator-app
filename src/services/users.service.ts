import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UserDto } from 'src/dtos/user/user.dto';
import { UserDocument } from 'src/schemas/users/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(userDto: UserDto): Promise<UserDocument> {
    return this.usersRepository.create(userDto);
  }

  findAllUsers(): Promise<UserDocument[]> {
    const filterQuery = {};
    return this.usersRepository.find(filterQuery);
  }

  findUserById(userId: string): Promise<UserDocument> {
    const filterQuery = { _id: userId };
    return this.usersRepository.findOne(filterQuery);
  }

  updateUser(userId: string, userUpdates: UserDto): Promise<UserDocument> {
    const filterQuery = { _id: userId };
    return this.usersRepository.update(filterQuery, userUpdates);
  }

  deleteUser(userId: string): Promise<{ message: string }> {
    const filterQuery = { _id: userId };
    return this.usersRepository.delete(filterQuery);
  }
}
