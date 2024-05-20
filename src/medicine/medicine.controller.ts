import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import ROLE from '../enums/role.enum';
import { MutationStockMedicineDto } from './dto/mutation-stock-medicine.dto';
import { CreateMassMedicineDto } from './dto/create-mass-medicine.dto';
import toProperCase from 'src/utils/toProperCase';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createMedicineDto: CreateMedicineDto) {
    if(req.user.role!=ROLE.ADMIN) throw new UnauthorizedException('You are not authorized to add medicine')
    createMedicineDto.name = createMedicineDto.name.toLowerCase()
    let res = await this.medicineService.create(createMedicineDto)
    return {
      message: "Medicine added successfully",
      data: res
    };
  }
  @UseGuards(AuthGuard)
  @Post("mass")
  async createMass(@Request() req, @Body() createMassMedicineDto: CreateMassMedicineDto) {
    if(req.user.role!=ROLE.ADMIN) throw new UnauthorizedException('You are not authorized to add medicine')
    let medicines = JSON.parse(createMassMedicineDto.medicines)
    medicines.map(med => {
      med.stock = parseInt(med.stock)
      med.price = parseInt(med.price)
    })
    let res = await this.medicineService.createMass(medicines)
    return {
      message: "Medicines created successfully",
      data: res
    };
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('name') name: string) {
    let meds = []
    if(name) meds = await this.medicineService.findAllWithFilter(name.toLowerCase());
    else meds = await this.medicineService.findAll();

    //make all the name proper case
    meds = meds.map(med => {
      med.name = toProperCase(med.name)
      return med
    })

    return {
      message: "Medicines data retrieved successfully",
      data: meds
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    if(req.user.role!=ROLE.ADMIN) throw new UnauthorizedException('You are not authorized to edit medicine data')
    updateMedicineDto.name = updateMedicineDto.name.toLowerCase()
    let res = await this.medicineService.update(+id, updateMedicineDto);
    return {
      message: `${res.name} data updated successfully`,
      data: res
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id/stock')
  async addStock(@Request() req, @Param('id') id: string, @Body() stockMedicineDto: MutationStockMedicineDto) {
    if(req.user.role!=ROLE.ADMIN) throw new UnauthorizedException('You are not authorized to add medicine stock')
    let res = await this.medicineService.addStock(+id, stockMedicineDto.stock);
    return {
      message: `${res.name} stock added successfully`,
      data: res
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    if(req.user.role!=ROLE.ADMIN) throw new UnauthorizedException('You are not authorized to remove all medicine stock')

    let del =  await this.medicineService.remove(+id);
    return {
      message: `All ${del.name} stock removed successfully`,
      data: del
    }
  }
}
