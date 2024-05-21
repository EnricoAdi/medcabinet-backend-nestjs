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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TransactionService = class TransactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTransactionDto, user_id) {
        let d_transaction = [];
        let total_price = 0;
        let total_quantity = 0;
        for (let i = 0; i < createTransactionDto.detail.length; i++) {
            let d = {
                ...createTransactionDto.detail[i],
                price: 0
            };
            let getItem = await this.prisma.medicine.findUnique({
                where: {
                    medicine_id: d.medicine_id
                }
            });
            if (!getItem) {
                throw new common_1.NotFoundException(`Medicine with id ${d.medicine_id} not found`);
            }
            if (getItem.stock < d.quantity) {
                throw new common_1.BadRequestException(`Stock ${getItem.name} is not enough`);
            }
            let updateStock = await this.prisma.medicine.update({
                where: {
                    medicine_id: d.medicine_id
                },
                data: {
                    stock: getItem.stock - d.quantity
                }
            });
            d.price = getItem.price;
            d_transaction.push(d);
            total_price += d.price * d.quantity;
            total_quantity += d.quantity;
        }
        let result = await this.prisma.transaction.create({
            data: {
                user_id,
                total_price,
                total_quantity,
                dtransaction: {
                    create: d_transaction
                }
            }
        });
        if (!result)
            throw new common_1.InternalServerErrorException("Failed to create transaction");
        return result;
    }
    findAll() {
        return this.prisma.transaction.findMany();
    }
    findByUser(user_id) {
        return this.prisma.transaction.findMany({
            where: { user_id }
        });
    }
    findOne(transaction_id) {
        return this.prisma.transaction.findUnique({
            where: {
                transaction_id
            },
            include: {
                user: true,
                dtransaction: {
                    include: {
                        medicine: true
                    }
                }
            }
        });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map