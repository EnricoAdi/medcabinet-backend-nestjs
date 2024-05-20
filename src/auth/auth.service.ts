import { Injectable } from '@nestjs/common'; 
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import ROLE from '../enums/role.enum';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async checkUsername(username:string){
    let cekUser = await this.prisma.user.findFirst({
      where:{
        username
      }
    })
    if(cekUser) return cekUser
    return null
  }

  async createUser(data:RegisterDto){
    let newUser = {
      username: data.username,
      password: data.password,
      name: data.name
    }
    let result = await this.prisma.user.create({
      data:{
        ...newUser,
        role: ROLE.USER
      }
    })
    return result
  }
  
  async createAdmin(data:RegisterDto){
    let newUser = {
      username: data.username,
      password: data.password,
      name: data.name
    }
    let result = await this.prisma.user.create({
      data:{
        ...newUser,
        role: ROLE.ADMIN
      }
    })
    return result
  }
}
