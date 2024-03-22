import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async findOne(filterQuery: FilterQuery<UserDocument>): Promise<UserDto> {
    const user = await this.usersModel.findOne(filterQuery);
    if (user) this.serializeUser(user);
    throw new NotFoundException('User not found');
  }

  async find(filterQuery: FilterQuery<UserDocument>): Promise<UserDto[]> {
    const users = await this.usersModel.find(filterQuery);
    if (users) return users.map((user) => this.serializeUser(user));

    throw new NotFoundException('User not found');
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    const userExists = await this.findByEmail({
      'emails.identifier': user.emails[0].identifier,
    });

    if (userExists) throw new ForbiddenException('User already exists');

    const generatedSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, generatedSalt);

    const newUser = await this.usersModel.create({
      ...user,
      password: hashedPassword,
      salt: generatedSalt,
    });

    return this.serializeUser(newUser);
  }

  async update(
    filterQuery: FilterQuery<UserDocument>,
    userUpdates: UpdateUserDto,
  ): Promise<UserDto> {
    const existingUser = await this.usersModel.findById(filterQuery);

    if (existingUser) {
      if (userUpdates.personalInfo) {
        existingUser.personalInfo = {
          ...existingUser.personalInfo,
          ...userUpdates.personalInfo,
        };
      }

      if (userUpdates.phones.length !== 0) {
        existingUser.phones = userUpdates.phones;
      }

      if (userUpdates.emails.length !== 0) {
        existingUser.emails = userUpdates.emails;
      }

      if (userUpdates.tags.length !== 0) {
        existingUser.tags = userUpdates.tags;
      }

      const user = await existingUser.save();
      return this.serializeUser(user);
    }
    throw new NotFoundException('User not found');
  }

  async findByEmail(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return await this.usersModel.findOne(filterQuery);
  }

  private serializeUser(user: UserDocument): UserDto {
    const { _id, personalInfo, phones, emails, tags } = user;
    return { _id, personalInfo, phones, emails, tags };
  }
}
