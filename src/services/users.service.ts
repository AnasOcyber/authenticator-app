import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserDto } from 'src/dto/user/user.dto';

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
    return this.usersRepository.update({ _id: userId }, userUpdates);
  }
}
