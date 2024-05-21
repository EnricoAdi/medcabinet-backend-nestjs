import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MutationStockMedicineDto } from './dto/mutation-stock-medicine.dto';
import { CreateMassMedicineDto } from './dto/create-mass-medicine.dto';
export declare class MedicineController {
    private readonly medicineService;
    constructor(medicineService: MedicineService);
    create(req: any, createMedicineDto: CreateMedicineDto): Promise<{
        message: string;
        data: {
            medicine_id: number;
            name: string;
            price: number;
            stock: number;
            image: string;
        };
    }>;
    createMass(req: any, createMassMedicineDto: CreateMassMedicineDto): Promise<{
        message: string;
        data: import(".prisma/client").Prisma.BatchPayload;
    }>;
    findAll(name: string): Promise<{
        message: string;
        data: any[];
    }>;
    findOne(id: string): Promise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }>;
    update(req: any, id: string, updateMedicineDto: UpdateMedicineDto): Promise<{
        message: string;
        data: {
            medicine_id: number;
            name: string;
            price: number;
            stock: number;
            image: string;
        };
    }>;
    addStock(req: any, id: string, stockMedicineDto: MutationStockMedicineDto): Promise<{
        message: string;
        data: {
            medicine_id: number;
            name: string;
            price: number;
            stock: number;
            image: string;
        };
    }>;
    remove(req: any, id: string): Promise<{
        message: string;
        data: {
            medicine_id: number;
            name: string;
            price: number;
            stock: number;
            image: string;
        };
    }>;
}
