import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<UserDto> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(userDto);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.updateUser(userId, userDto);
  }
}
