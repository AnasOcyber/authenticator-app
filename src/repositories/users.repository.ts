import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users/user.schema';
import { UserDto } from 'src/dtos/user/user.dto';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async create(userDto: UserDto): Promise<UserDocument> {
    const alreadyExists = await this.findByEmail({
      'emails.identifier': userDto.emails[0].identifier,
    });

    if (alreadyExists) throw new ForbiddenException();

    const newUser = await this.usersModel.create(userDto);

    const generatedSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, generatedSalt);

    const newAuth = {
      userId: newUser.id,
      userSalt: generatedSalt,
      userPassword: hashedPassword,
      roles: [],
    };

    await this.authService.createAuth(newAuth);

    return newUser;
  }

  async find(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    const users = await this.usersModel.find(filterQuery);

    if (users) return users;
    throw new NotFoundException();
  }

  async findOne(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument> {
    const user = await this.usersModel.findOne(filterQuery);
    if (user) return user;
    throw new NotFoundException();
  }

  async update(
    filterQuery: FilterQuery<UserDocument>,
    userUpdates: UserDto,
  ): Promise<UserDocument> {
    const userFound = await this.usersModel.findById(filterQuery);

    if (userFound) {
      if (userUpdates.personalInfo) {
        userFound.personalInfo = {
          ...userFound.personalInfo,
          ...userUpdates.personalInfo,
        };
      }

      if (userUpdates.phones?.length !== 0) {
        userFound.phones = userUpdates.phones;
      }

      if (userUpdates.emails?.length !== 0) {
        userFound.emails = userUpdates.emails;
      }

      if (userUpdates.tags?.length !== 0) {
        userFound.tags = userUpdates.tags;
      }

      return await userFound.save();
    }
    throw new NotFoundException();
  }

  async delete(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<{ message: string }> {
    const result = await this.usersModel.findByIdAndDelete(filterQuery);

    if (result) {
      await this.authService.deleteAuth(filterQuery._id);
      return { message: 'User deleted' };
    }
    throw new NotFoundException();
  }

  async findByEmail(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return await this.usersModel.findOne(filterQuery);
  }
}
