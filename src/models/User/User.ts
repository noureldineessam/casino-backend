import { IsString, IsInt, IsDate, IsOptional, } from 'class-validator';


export class User {

  id!: string;

  name!: string;

  bankAccount!: string;

  @IsInt()
  @IsOptional()
  balance!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;

  @IsDate()
  @IsOptional()
  lastLoginAt!: Date;

  @IsDate()
  @IsOptional()
  lastLogoutAt!: Date;

  @IsDate()
  @IsOptional()
  lastCashoutAt!: Date;
}