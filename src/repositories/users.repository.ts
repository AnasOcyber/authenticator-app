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

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async findOne(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument> {
    const user = await this.usersModel.findOne(filterQuery);
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async find(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    const users = await this.usersModel.find(filterQuery);
    if (users) return users;
    throw new NotFoundException('User not found');
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const userExists = await this.findByEmail({
      'emails.identifier': user.emails[0].identifier,
      'phones.identifier': user.phones[0].identifier,
    });

    if (userExists) throw new ForbiddenException('User already exists');

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
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async findByEmail(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return await this.usersModel.findOne(filterQuery);
  }
}
