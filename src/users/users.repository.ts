import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async findOne(filterQuery: FilterQuery<User>): Promise<User> {
    return await this.usersModel.findOne(filterQuery);
  }

  async find(filterQuery: FilterQuery<User>): Promise<User[]> {
    return await this.usersModel.find(filterQuery);
  }

  async create(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.password, salt);

    return await this.usersModel.create({
      ...user,
      password: password,
      salt: salt,
    });
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    { emails, phones, personalInfo, tags }: Partial<User>,
  ): Promise<User> {
    return await this.usersModel.findOneAndUpdate(
      filterQuery,
      { $set: { emails, phones, personalInfo, tags } },
      {
        new: true,
      },
    );
  }
}
