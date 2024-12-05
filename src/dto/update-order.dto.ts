import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Order } from "src/entities/order.entity";
import { OrderItem } from 'src/entities/order-item.entity';
import { OrderStatus } from 'src/entities/order-status.entity';
import { Payment } from 'src/entities/payment.entity';


export class UpdateOrderDto implements Order {
  
     
  @Exclude()
  idOrder: number;
  
  @IsOptional()
  orderDate: string ;

  @IsOptional()
  idUserSite: number;

  @IsOptional()
  details: string ;

  @IsOptional()
  @IsBoolean()
  active: boolean ;
  
  @IsOptional()
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