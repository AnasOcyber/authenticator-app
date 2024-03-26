import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { UserDto } from 'src/dtos/user/user.dto';
import { UserDocument } from 'src/schemas/users/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: UserDto): Promise<UserDocument> {
    return this.usersService.createUser(userDto);
  }
  @Get()
  getAllUsers(): Promise<UserDocument[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<UserDocument> {
    return this.usersService.findUserById(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() userDto: UserDto,
  ): Promise<UserDocument> {
    return this.usersService.updateUser(userId, userDto);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<{ message: string }> {
    return this.usersService.deleteUser(userId);
  }
}
