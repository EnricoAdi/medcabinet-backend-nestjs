"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MedicineService = class MedicineService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMedicineDto) {
        return this.prisma.medicine.create({
            data: createMedicineDto
        });
    }
    async createMass(medicines) {
        return this.prisma.medicine.createMany({
            data: medicines
        });
    }
    async findAll() {
        return this.prisma.medicine.findMany();
    }
    findAllWithFilter(name) {
        return this.prisma.medicine.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        });
    }
    async findOne(id) {
        return this.prisma.medicine.findUnique({
            where: {
                medicine_id: id
            }
        });
    }
    async update(id, updateMedicineDto) {
        let res = await this.prisma.medicine.update({
            where: { medicine_id: id },
            data: {
                name: updateMedicineDto.name,
                image: updateMedicineDto.image,
                price: updateMedicineDto.price
            }
        });
        return res;
    }
    async addStock(id, stock) {
        let res = await this.prisma.medicine.update({
            where: { medicine_id: id },
            data: {
                stock: {
                    increment: stock
                },
            }
        });
        return res;
    }
    async remove(id) {
        let res = await this.prisma.medicine.update({
            where: { medicine_id: id },
            data: { stock: 0 }
        });
        return res;
    }
};
exports.MedicineService = MedicineService;
exports.MedicineService = MedicineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicineService);
//# sourceMappingURL=medicine.service.js.map