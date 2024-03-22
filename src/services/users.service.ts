import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { validate } from 'class-validator';

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
    const { personalInfo, password, phones, emails, tags } = userDto;

    const errors = await validate(userDto);
    if (errors.length > 0) {
      throw new BadRequestException();
    }

    return this.usersRepository.create({
      personalInfo,
      password,
      phones,
      emails,
      tags,
    });
  }

  updateUser(userId: string, userUpdates: UpdateUserDto): Promise<UserDto> {
    return this.usersRepository.update({ _id: userId }, userUpdates);
  }
}
