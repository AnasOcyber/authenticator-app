import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async findOne(filterQuery: FilterQuery<User>): Promise<UserDto> {
    const user = await this.usersModel.findOne(filterQuery);

    return this.serializeUser(user);
  }

  async find(filterQuery: FilterQuery<User>): Promise<UserDto[]> {
    const users = await this.usersModel.find(filterQuery);

    return users.map((user) => this.serializeUser(user));
  }

  async create(user: User): Promise<UserDto> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.password, salt);

    const newUser = await this.usersModel.create({
      ...user,
      password: password,
      salt: salt,
    });

    return this.serializeUser(newUser);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    { emails, phones, personalInfo, tags }: Partial<User>,
  ): Promise<UserDto> {
    const user = await this.usersModel.findOneAndUpdate(
      filterQuery,
      { $set: { emails, phones, personalInfo, tags } },
      {
        new: true,
      },
    );

    return this.serializeUser(user);
  }

  async findByEmail(filterQuery: FilterQuery<User>): Promise<User> {
    return await this.usersModel.findOne(filterQuery);
  }

  private serializeUser(user: any): UserDto {
    const { personalInfo, phones, emails, tags, _id } = user;
    return {
      _id,
      personalInfo,
      phones,
      emails,
      tags,
    };
  }
}
