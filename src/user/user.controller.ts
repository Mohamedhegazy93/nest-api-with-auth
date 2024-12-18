import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';
import { ParseObjectIdPipe } from 'src/category/pipes/objectIdPipe.pipe';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Req() req) {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id', new ParseObjectIdPipe()) id: number, @Req() req) {
    return this.userService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', new ParseObjectIdPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.userService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Patch('deleteuser/:id')
  deleteUser(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    console.log(req.user);

    return this.userService.deleteUser(id, updateUserDto, req.user);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', new ParseObjectIdPipe()) id: string, @Req() req) {
    return this.userService.remove(id);
  }
}
