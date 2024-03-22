import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUserById(userId: string): Promise<UserDocument> {
    return this.usersRepository.findOne({ _id: userId });
  }

  getUsers(): Promise<UserDocument[]> {
    return this.usersRepository.find({});
  }

  createUser(userDto: CreateUserDto): Promise<UserDocument> {
    return this.usersRepository.create(userDto);
  }

  updateUser(
    userId: string,
    userUpdates: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.usersRepository.update({ _id: userId }, userUpdates);
  }
}
