import { OrderItem } from 'src/entities/order-item.entity';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Order } from 'src/entities/order.entity';



export class CreateOrderItemDto implements OrderItem {

    @Exclude()
    idOrderItem: number;

    @IsNotEmpty({message:"CAMPO idOrder OBRIGATÓRIO"})
    idOrder: number;

    @IsNotEmpty({message:"CAMPO idProduct OBRIGATÓRIO"})
    idProduct: number;

    @IsNotEmpty({message:"CAMPO quantity OBRIGATÓRIO"})
    quantity: number;
    
    @IsNotEmpty({message:"CAMPO productName OBRIGATÓRIO"})
    productName: string ;

    @IsNotEmpty({message:"CAMPO price OBRIGATÓRIO"})
    price: number;

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
    idOrder2: Order;

  }  
