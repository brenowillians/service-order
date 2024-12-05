import { Order } from "src/entities/order.entity";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { OrderItem } from "src/entities/order-item.entity";
import { OrderStatus } from "src/entities/order-status.entity";
import { Payment } from "src/entities/payment.entity";


export class CreateOrderDto implements Order{
    

    @Exclude()
    idOrder: number;
    
    @IsNotEmpty({message:"CAMPO orderDate OBRIGATÓRIO"})
    orderDate: string ;

    @IsNotEmpty({message:"CAMPO idUserSite OBRIGATÓRIO"})
    idUserSite: number;

    @IsNotEmpty({message:"CAMPO details OBRIGATÓRIO"})
    details: string ;

    @IsOptional()
    active: boolean ;
    
    @IsNotEmpty({message:"CAMPO createdId OBRIGATÓRIO"})
    createdId: number;

    @IsOptional()
    updatedId: number | null;
    
    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
    
    @Exclude()
    deletedDate: string;  
 

     
    @Exclude()
    orderItems: OrderItem[];

    @Exclude()
    orderStatus: OrderStatus[];

    @Exclude()
    payment: Payment[];
  }  
