import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        data: {
            access_token: string;
            name: string;
            username: string;
            role: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        data: {
            user_id: number;
            username: string;
            name: string;
            password: string;
            role: string;
        };
    }>;
    registerAdmin(req: any, registerDto: RegisterDto): Promise<{
        message: string;
        data: {
            user_id: number;
            username: string;
            name: string;
            password: string;
            role: string;
        };
    }>;
    getProfile(req: any): any;
}
