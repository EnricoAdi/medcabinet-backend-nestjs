import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class MedicineService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMedicineDto: CreateMedicineDto): Promise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }>;
    createMass(medicines: {
        name: string;
        image: string;
        price: number;
        stock: number;
    }[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    findAll(): Promise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }[]>;
    findAllWithFilter(name: string): import(".prisma/client").Prisma.PrismaPromise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }[]>;
    findOne(id: number): Promise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }>;
    update(id: number, updateMedicineDto: UpdateMedicineDto): Promise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }>;
    addStock(id: number, stock: number): Promise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }>;
    remove(id: number): Promise<{
        medicine_id: number;
        name: string;
        price: number;
        stock: number;
        image: string;
    }>;
}
