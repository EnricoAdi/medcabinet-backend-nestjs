import { BadRequestException, Body, ConflictException, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import ROLE from 'src/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto){
    let checkUser = await this.authService.checkUsername(loginDto.username);
    
    if(!checkUser) throw new NotFoundException('User not found')
    
    let cekPass = await bcrypt.compare(loginDto.password, checkUser.password);
    if(cekPass){
      const payload = { user_id: checkUser.user_id, username: checkUser.username, role: checkUser.role};
      
      const access_token = await this.jwtService.signAsync(payload)
      return {
        message: "Login success",
        data: {
          access_token,
          name: checkUser.name,
          username: checkUser.username,
          role: checkUser.role
        }
      }
    }else throw new BadRequestException('Incorrect password')
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto){
    if(registerDto.password != registerDto.confirmationPassword) throw new BadRequestException('Password and confirmation not match')
    const checkUser = await this.authService.checkUsername(registerDto.username);
    if(checkUser) throw new ConflictException('Username already taken')

    let pass = await bcrypt.hash(registerDto.password, 10);
    const createUser = await this.authService.createUser({
      ...registerDto,
      password: pass
    });

    if(!createUser) throw new InternalServerErrorException("Failed to register user")
    createUser.password = "";
    return {
      message: "User registered successfully",
      data: createUser
    }
  }

  @UseGuards(AuthGuard)
  @Post("register/admin")
  async registerAdmin(@Request() req,@Body() registerDto: RegisterDto){
    if(req.user.role!=ROLE.ADMIN) throw new UnauthorizedException('You are not authorized to add admin')
    
    const checkUser = await this.authService.checkUsername(registerDto.username);
    if(checkUser) throw new ConflictException('Username already taken')

    let pass = await bcrypt.hash(registerDto.password, 10);
    const createUser = await this.authService.createAdmin({
      ...registerDto,
      password: pass
    });

    if(!createUser) throw new InternalServerErrorException("Failed to register admin")
    createUser.password = "";
    return {
      message: "Admin registered successfully",
      data: createUser
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
