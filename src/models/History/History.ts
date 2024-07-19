import { IsString, IsInt, IsDate, IsOptional, } from 'class-validator';
import { PrismaClient, TransactionType } from '@prisma/client';


export class History {

  id!: string;

  userId!: string;

  timestamp!: Date;

  amount!: number;

  transactionType!: TransactionType
}