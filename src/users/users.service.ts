import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUserById(userId: string): Promise<UserDto> {
    return this.usersRepository.findOne({ _id: userId });
  }

  getUsers(): Promise<UserDto[]> {
    return this.usersRepository.find({});
  }

  createUser(userDto: CreateUserDto): Promise<UserDto> {
    return this.usersRepository.create(userDto);
  }

  updateUser(userId: string, userUpdates: UpdateUserDto): Promise<UserDto> {
    return this.usersRepository.findOneAndUpdate({ _id: userId }, userUpdates);
  }
}
