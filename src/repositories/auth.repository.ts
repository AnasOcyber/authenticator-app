import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { AuthDto } from 'src/dtos/auth/auth.dto';
import { Auth, AuthDocument } from 'src/schemas/auth/auth.schema';

export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async create(authDto: AuthDto): Promise<AuthDocument> {
    return await this.authModel.create(authDto);
  }

  async find(filterQuery: FilterQuery<AuthDocument>): Promise<AuthDocument[]> {
    const auths = await this.authModel.find(filterQuery);

    if (auths) return auths;
    throw new NotFoundException();
  }

  async findOne(filterQuery: FilterQuery<AuthDocument>): Promise<AuthDocument> {
    const auth = await this.authModel.findOne(filterQuery);

    if (auth) return auth;
    throw new NotFoundException();
  }

  async update(
    filterQuery: FilterQuery<AuthDocument>,
    authUpdates: AuthDto,
  ): Promise<AuthDocument> {
    const reusult = await this.authModel.findByIdAndUpdate(
      filterQuery,
      authUpdates,
    );

    if (reusult) return reusult;
    throw new NotFoundException();
  }

  async delete(
    filterQuery: FilterQuery<AuthDocument>,
  ): Promise<{ message: string }> {
    const result = (await this.authModel.deleteOne(filterQuery)).acknowledged;

    if (result) return { message: 'Auth deleted' };
    throw new NotFoundException();
  }
}
