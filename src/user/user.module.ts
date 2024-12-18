import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from './schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
  ]),
],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserModule]
})
export class UserModule {}
