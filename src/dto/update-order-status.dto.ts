import {IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { OrderStatus } from 'src/entities/order-status.entity';
import { Order } from 'src/entities/order.entity';
import { Status } from 'src/entities/status.entity';


export class UpdateOrderStatusDto implements OrderStatus{

@Exclude()
idOrderStatus: number;

@IsOptional()

idOrder: number;

@IsOptional()
@IsInt()
idStatus: number;

@IsOptional()
description: string;


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

@Exclude()
idStatus2: Status;

}  
