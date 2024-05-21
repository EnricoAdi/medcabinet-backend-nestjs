import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<{
        message: string;
        data: {
            transaction_id: number;
            user_id: number;
            total_quantity: number;
            total_price: number;
            created_at: Date;
        };
    }>;
    findAll(): Promise<{
        message: string;
        data: {
            transaction_id: number;
            user_id: number;
            total_quantity: number;
            total_price: number;
            created_at: Date;
        }[];
    }>;
    findByUser(req: any): Promise<{
        message: string;
        data: {
            transaction_id: number;
            user_id: number;
            total_quantity: number;
            total_price: number;
            created_at: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: {
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
        };
    }>;
}
