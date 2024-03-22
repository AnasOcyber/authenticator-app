import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findUserById(userId: string): Promise<UserDto> {
    return this.usersRepository.findOne({ _id: userId });
  }

  findAllUsers(): Promise<UserDto[]> {
    return this.usersRepository.find({});
  }

  async createUser(userDto: CreateUserDto): Promise<UserDto> {
    const userExists = await this.usersRepository.findOne({
      'emails.identifier': userDto.emails[0].identifier,
    });

    if (userExists) throw new ForbiddenException();

    return this.usersRepository.create(userDto);
  }

  updateUser(userId: string, userUpdates: UpdateUserDto): Promise<UserDto> {
    return this.usersRepository.update({ _id: userId }, userUpdates);
  }
}
