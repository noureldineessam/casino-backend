import { TransactionType } from '@prisma/client';


export class History {

  id!: string;

  userId!: string;

  timestamp!: Date;

  amount!: number;

  transactionType!: TransactionType
}