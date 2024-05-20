import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import toProperCase from '../utils/toProperCase';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    let data = {...createTransactionDto, detail: JSON.parse(createTransactionDto.detail)}
    let user_id = req.user.user_id;
    let res = await this.transactionService.create(data, user_id);
    return {
      message: "New transaction created successfully",
      data: res
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    let res = await this.transactionService.findAll();
    return {
      message: "Transaction data retrieved successfully",
      data: res
    }
  }

  @UseGuards(AuthGuard)
  @Get("user")
  async findByUser(@Request() req){
    let user_id = req.user.user_id;
    let res = await this.transactionService.findByUser(user_id);
    return {
      message: "Transaction data by user retrieved successfully",
      data: res
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let res = await this.transactionService.findOne(+id);
    //medicine name to proper case
    res.dtransaction = res.dtransaction.map(d => {
      d.medicine.name = toProperCase(d.medicine.name)
      return d
    }) 
    return {
      message: "Transaction data retrieved successfully",
      data: res
    }
  }

}
