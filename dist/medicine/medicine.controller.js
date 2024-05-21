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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineController = void 0;
const common_1 = require("@nestjs/common");
const medicine_service_1 = require("./medicine.service");
const create_medicine_dto_1 = require("./dto/create-medicine.dto");
const update_medicine_dto_1 = require("./dto/update-medicine.dto");
const auth_guard_1 = require("../auth/auth.guard");
const role_enum_1 = require("../enums/role.enum");
const mutation_stock_medicine_dto_1 = require("./dto/mutation-stock-medicine.dto");
const create_mass_medicine_dto_1 = require("./dto/create-mass-medicine.dto");
const toProperCase_1 = require("../utils/toProperCase");
let MedicineController = class MedicineController {
    constructor(medicineService) {
        this.medicineService = medicineService;
    }
    async create(req, createMedicineDto) {
        if (req.user.role != role_enum_1.default.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to add medicine');
        createMedicineDto.name = createMedicineDto.name.toLowerCase();
        let res = await this.medicineService.create(createMedicineDto);
        return {
            message: "Medicine added successfully",
            data: res
        };
    }
    async createMass(req, createMassMedicineDto) {
        if (req.user.role != role_enum_1.default.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to add medicine');
        let medicines = JSON.parse(createMassMedicineDto.medicines);
        medicines.map(med => {
            med.stock = parseInt(med.stock);
            med.price = parseInt(med.price);
        });
        let res = await this.medicineService.createMass(medicines);
        return {
            message: "Medicines created successfully",
            data: res
        };
    }
    async findAll(name) {
        let meds = [];
        if (name)
            meds = await this.medicineService.findAllWithFilter(name.toLowerCase());
        else
            meds = await this.medicineService.findAll();
        meds = meds.map(med => {
            med.name = (0, toProperCase_1.default)(med.name);
            return med;
        });
        return {
            message: "Medicines data retrieved successfully",
            data: meds
        };
    }
    findOne(id) {
        return this.medicineService.findOne(+id);
    }
    async update(req, id, updateMedicineDto) {
        if (req.user.role != role_enum_1.default.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to edit medicine data');
        updateMedicineDto.name = updateMedicineDto.name.toLowerCase();
        let res = await this.medicineService.update(+id, updateMedicineDto);
        return {
            message: `${res.name} data updated successfully`,
            data: res
        };
    }
    async addStock(req, id, stockMedicineDto) {
        if (req.user.role != role_enum_1.default.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to add medicine stock');
        let res = await this.medicineService.addStock(+id, stockMedicineDto.stock);
        return {
            message: `${res.name} stock added successfully`,
            data: res
        };
    }
    async remove(req, id) {
        if (req.user.role != role_enum_1.default.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to remove all medicine stock');
        let del = await this.medicineService.remove(+id);
        return {
            message: `All ${del.name} stock removed successfully`,
            data: del
        };
    }
};
exports.MedicineController = MedicineController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_medicine_dto_1.CreateMedicineDto]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("mass"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_mass_medicine_dto_1.CreateMassMedicineDto]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "createMass", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicineController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_medicine_dto_1.UpdateMedicineDto]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id/stock'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, mutation_stock_medicine_dto_1.MutationStockMedicineDto]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "addStock", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "remove", null);
exports.MedicineController = MedicineController = __decorate([
    (0, common_1.Controller)('medicine'),
    __metadata("design:paramtypes", [medicine_service_1.MedicineService])
], MedicineController);
//# sourceMappingURL=medicine.controller.js.map