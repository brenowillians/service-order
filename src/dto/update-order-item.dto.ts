import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Order } from "src/entities/order.entity";
import { OrderItem } from 'src/entities/order-item.entity';


export class UpdateOrderItemDto implements OrderItem {

     
    @Exclude()
    idOrderItem: number;

    @IsOptional()
    idOrder: number;

    @IsOptional()
    idProduct: number;

    @IsOptional()
    quantity: number;
    
    @IsOptional()
    productName: string ;

    @IsOptional()
    price: number;

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
    idOrder2: Order;

  }