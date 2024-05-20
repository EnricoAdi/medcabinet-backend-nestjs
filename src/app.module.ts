import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicineModule } from './medicine/medicine.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module'; 

@Module({
  imports: [MedicineModule, AuthModule, PrismaModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
