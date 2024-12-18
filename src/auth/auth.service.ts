import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UpdateAuthDto } from './dto/update-auth.dto';
const saltOrRounds = 10;

//all private for each user
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signup(signUpDto: SignUpDto) {
    //check if user is already signup in system
    const userexited = await this.userModel.findOne({
      email: signUpDto.email,
    });

    if (userexited) {
      throw new HttpException(
        'this email is already signup in system,you can login now',
        400,
      );
    }

    //hashing password
    const { password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = {
      password: hashedPassword,
    };

    return this.userModel.create({ ...signUpDto, ...user });
  }
  //---------------------------------login-------------------------------
  async login(loginDto: LoginDto) {
    //is user signup
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('please sign up first');
    }
    //check password

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('your email or password is not correct');
    }
    //create token

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.sign(payload);
    console.log(token);

    return {
      message: 'logged successfully',
      token,
      email: user.email,
    };
  }
  //---------------------------updateuserdata----------------------------

  async updateUserData(id: string, updateUserDataDto: UpdateAuthDto, payload) {
    //check if this data belong to user or not
    if (id !== payload._id) {
      throw new UnauthorizedException('you can not perform this action');
    }
    const { name, email, password } = updateUserDataDto;

    //check if user try to update his password

    if (password) {
      throw new UnauthorizedException(
        'you can not edit your password from here',
      );
    }

    const user = {
      name,
      email,
    };

    return this.userModel.findByIdAndUpdate(id, user);
  }
  //---------------------------getUserData----------------------------

  async getUserData(id: string, payload) {
    //check if this data belong to user or not

    if (id !== payload._id) {
      throw new UnauthorizedException('you can not perform this action');
    }
    //check user exist

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('no user for this id');
    }
    return user;
  }
  //---------------------------updatePassword----------------------------

  async updatePassword(id: string, updateUserDataDto: UpdateAuthDto, payload) {
    //check if this data belong to user or not

    if (id !== payload._id) {
      throw new UnauthorizedException('you can not perform this action');
    }
    const userExist = await this.userModel.findById(id);
    if (!userExist) {
      throw new NotFoundException('no user for this id');
    }

    const { password } = updateUserDataDto;
    if (!password) {
      throw new UnauthorizedException('please enter your new password');
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (isMatch) {
      throw new UnauthorizedException(
        'this is old password,please try another password',
      );
    }
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.userModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    return {
      user,
      message: 'user updated password',
    };
  }
}
