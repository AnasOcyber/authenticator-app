import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return await this.usersModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return await this.usersModel.find(userFilterQuery);
  }

  async create(user: User): Promise<User> {
    return await this.usersModel.create(user);
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return await this.usersModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }
}
