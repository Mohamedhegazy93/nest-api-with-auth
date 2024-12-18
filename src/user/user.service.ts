import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

import { isValidObjectId, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
const saltOrRounds = 10;

//all private or Admins

@Injectable()
export class UserService {
  //inject User model
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  //--------Create User-------------
  async create(createUserDto: CreateUserDto) {
    const userexited = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userexited) {
      throw new HttpException('this email is already created in system', 400);
    }
    //hasing passord

    const { password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = {
      password: hashedPassword,
    };
    //match password with his hash
    //  const isMatch = await bcrypt.compare(password, hashedPassword);
    //  console.log(isMatch)

    return await this.userModel.create({ ...createUserDto, ...user });
  }
  //------------Get Users-----------------
  findAll() {
    return this.userModel.find();
  }
  //Get One User
  async findOne(id: number) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
  //Update User 
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ObjectId');
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  //Delete User
  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ObjectId');
    }

    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return {
      message: 'user deleted',
      data: user,
    };
  }

  async deleteUser(id: string, updateUserDataDto: UpdateAuthDto, payload) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ObjectId');
    }

    if (id !== payload._id) {
      throw new UnauthorizedException('you can not perform this action');
    }

    const { active } = updateUserDataDto;

    const user = await this.userModel.findByIdAndUpdate(id, { active: false });
    return {
      user,
      message: 'user deactiveated',
    };
    

  }
}
