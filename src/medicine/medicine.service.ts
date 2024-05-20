import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}
  async create(createMedicineDto: CreateMedicineDto) {
    return this.prisma.medicine.create({
      data: createMedicineDto
    })
  }
  async createMass(
    medicines: {
      name: string;
      image: string;
      price: number;
      stock: number;
    }[]
  ) { 
    return this.prisma.medicine.createMany({
      data: medicines
    })
  }
  async findAll() {
    return this.prisma.medicine.findMany();
  }

  findAllWithFilter(name:string) {
    return this.prisma.medicine.findMany({
      where:{
        name:{
          contains:name
        }
      }
    })
  }
  async findOne(id: number) {
    return this.prisma.medicine.findUnique({
      where: {
        medicine_id:id
      }
    })
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    let res = await this.prisma.medicine.update({
      where: { medicine_id: id },
      data: {
        name: updateMedicineDto.name,
        image: updateMedicineDto.image,
        price: updateMedicineDto.price
      }
    })
    return res
  }

  async addStock(id: number, stock: number) {
    let res = await this.prisma.medicine.update({
      where: { medicine_id: id },
      data: {
        stock: {
          increment: stock
        },
      }
    })
    return res
  }

  async remove(id: number) {
    let res = await this.prisma.medicine.update({
      where: { medicine_id: id },
      data: { stock: 0 }
    })
    return res
  }
}
