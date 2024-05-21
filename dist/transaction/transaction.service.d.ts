import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTransactionDto: {
        detail: {
            medicine_id: number;
            quantity: number;
        }[];
    }, user_id: number): Promise<{
        transaction_id: number;
        user_id: number;
        total_quantity: number;
        total_price: number;
        created_at: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        transaction_id: number;
        user_id: number;
        total_quantity: number;
        total_price: number;
        created_at: Date;
    }[]>;
    findByUser(user_id: number): import(".prisma/client").Prisma.PrismaPromise<{
        transaction_id: number;
        user_id: number;
        total_quantity: number;
        total_price: number;
        created_at: Date;
    }[]>;
    findOne(transaction_id: number): import(".prisma/client").Prisma.Prisma__transactionClient<{
        user: {
            user_id: number;
            username: string;
            name: string;
            password: string;
            role: string;
        };
        dtransaction: ({
            medicine: {
                medicine_id: number;
                name: string;
                price: number;
                stock: number;
                image: string;
            };
        } & {
            dtrans_id: number;
            transaction_id: number;
            medicine_id: number;
            quantity: number;
            price: number;
            created_at: Date;
        })[];
    } & {
        transaction_id: number;
        user_id: number;
        total_quantity: number;
        total_price: number;
        created_at: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
