import { Order } from "src/entities/order.entity";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { OrderItem } from "src/entities/order-item.entity";
import { OrderStatus } from "src/entities/order-status.entity";
import { Payment } from "src/entities/payment.entity";


export class MakeOrderDto{

    @IsNotEmpty({message:"CAMPO idUserSite OBRIGATÓRIO"})
    idUserSite: number;

    @IsNotEmpty({message:"CAMPO details OBRIGATÓRIO"})
    details: string ;
    
    orderItems: OrderItem[];

    @IsNotEmpty({message:"CAMPO creditCardNumber OBRIGATÓRIO"})
    creditCardNumber: string

    @IsNotEmpty({message:"CAMPO expirationDate OBRIGATÓRIO"})
    expirationDate: string

    @IsNotEmpty({message:"CAMPO cvc OBRIGATÓRIO"})
    cvc: string

    @IsNotEmpty({message:"CAMPO creditCardOwner OBRIGATÓRIO"})
    creditCardOwner: string
  }  
