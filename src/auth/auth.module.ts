import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports:[MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
  ]),UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

//UserModule
