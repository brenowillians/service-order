import {IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { OrderStatus } from 'src/entities/order-status.entity';
import { Order } from 'src/entities/order.entity';
import { Status } from 'src/entities/status.entity';


export class CreateOrderStatusDto implements OrderStatus{
@Exclude()
idOrderStatus: number;

@IsNotEmpty({message:"CAMPO idOrder OBRIGATÓRIO"})
idOrder: number;

@IsNotEmpty({message:"CAMPO idStatus OBRIGATÓRIO"})
@IsInt()
idStatus: number;

@IsNotEmpty({message:"CAMPO description OBRIGATÓRIO"})
description: string;

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

@Exclude()
idStatus2: Status;

}  
