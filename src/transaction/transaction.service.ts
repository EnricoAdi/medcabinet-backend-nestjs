import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}
  
  async create(createTransactionDto: {detail:{medicine_id:number,quantity:number}[]}, user_id:number) {
    let d_transaction:{
      medicine_id: number;
      quantity: number;
      price: number;
    }[] = [];
    let total_price = 0;
    let total_quantity = 0;
    for (let i = 0; i < createTransactionDto.detail.length; i++) {
      let d = {
        ...createTransactionDto.detail[i],
        price: 0
      }
      let getItem = await this.prisma.medicine.findUnique({
        where: {
          medicine_id: d.medicine_id
        }
      })
      if(!getItem){
        throw new NotFoundException(`Medicine with id ${d.medicine_id} not found`)
      }
      if(getItem.stock<d.quantity){
        throw new BadRequestException(`Stock ${getItem.name} is not enough`)
      }
      // Update stock
      let updateStock = await this.prisma.medicine.update({
        where: {
          medicine_id: d.medicine_id
        },
        data: {
          stock: getItem.stock - d.quantity
        }
      })
      d.price = getItem.price
      d_transaction.push(d)
      total_price += d.price * d.quantity
      total_quantity += d.quantity
    }
    let result = await this.prisma.transaction.create({
      data:{
        user_id,
        total_price,
        total_quantity,
        dtransaction:{
          create: d_transaction
        }
      }}
    )
    if(!result) throw new InternalServerErrorException("Failed to create transaction")
    return result
  }

  findAll() {
    return this.prisma.transaction.findMany()
  }

  findByUser(user_id:number) { 
    return this.prisma.transaction.findMany({
      where:{user_id}
    }) 
  }

  findOne(transaction_id: number) {
    return  this.prisma.transaction.findUnique({
      where: {
        transaction_id
      },
      include:{
        user: true,
        dtransaction: {
          include: {
            medicine: true
          }
        }
      }
    })
  }

}
