import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<UserDocument> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  getUsers(): Promise<UserDocument[]> {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<UserDocument | string> {
    return this.usersService.createUser(userDto);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.usersService.updateUser(userId, userDto);
  }
}
