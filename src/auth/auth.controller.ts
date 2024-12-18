import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto, UpdateUserDataDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { ParseObjectIdPipe } from 'src/category/pipes/objectIdPipe.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Patch('updateuserdata/:id')
  updateUserData(@Param('id',new ParseObjectIdPipe()) id: string,@Body() updateUserDataDto: UpdateAuthDto,@Request() req) {
    return this.authService.updateUserData(id,updateUserDataDto,req.user);
  }
  @UseGuards(AuthGuard)
  @Get('getuserdata/:id')
  findOne(@Param('id',new ParseObjectIdPipe()) id: string,@Request() req){

    return this.authService.getUserData(id,req.user);
  }
 
  @UseGuards(AuthGuard)
  @Patch('updatepassword/:id')
  updatePaaword(@Param('id',new ParseObjectIdPipe()) id: string,@Body() updateUserDataDto: UpdateAuthDto,@Request() req) {
    return this.authService.updatePassword(id,updateUserDataDto,req.user);
  }

}
