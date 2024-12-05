import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { OrderStatus } from "src/entities/order-status.entity";
import { Status } from "src/entities/status.entity";


export class CreateStatusDto implements Status{
    

    @Exclude()
    idStatus: number;
     
    @IsNotEmpty({message:"CAMPO orderDate OBRIGATÓRIO"})
    description: string ;
    
    @IsNotEmpty({message:"CAMPO orderDate OBRIGATÓRIO"})
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
    orderStatus: OrderStatus[];
  }  