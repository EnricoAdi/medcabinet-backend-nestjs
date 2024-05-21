import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    checkUsername(username: string): Promise<{
        user_id: number;
        username: string;
        name: string;
        password: string;
        role: string;
    }>;
    createUser(data: RegisterDto): Promise<{
        user_id: number;
        username: string;
        name: string;
        password: string;
        role: string;
    }>;
    createAdmin(data: RegisterDto): Promise<{
        user_id: number;
        username: string;
        name: string;
        password: string;
        role: string;
    }>;
}
