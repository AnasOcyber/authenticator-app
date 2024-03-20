import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  createUser(userDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(userDto);
  }

  updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }
}
