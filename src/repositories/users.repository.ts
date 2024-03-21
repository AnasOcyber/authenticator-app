import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from 'src/dto/user/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async findOne(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument> {
    return await this.usersModel.findOne(filterQuery);
  }

  async find(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    const users = await this.usersModel.find(filterQuery);

    return users;
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.password, salt);

    return await this.usersModel.create({
      ...user,
      password: password,
      salt: salt,
    });
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<UserDocument>,
    { emails, phones, personalInfo, tags }: Partial<UserDocument>,
  ): Promise<UserDocument> {
    const user = await this.usersModel.findOneAndUpdate(
      filterQuery,
      { $set: { emails, phones, personalInfo, tags } },
      {
        new: true,
      },
    );
    return user;
  }

  async findByEmail(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return await this.usersModel.findOne(filterQuery);
  }
}
