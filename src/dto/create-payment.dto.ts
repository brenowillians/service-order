
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Order } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';



export class CreatePaymentDto implements Payment {


    @Exclude()
    idPayment: number;    

    @IsNotEmpty({message:"CAMPO idOrder OBRIGATÓRIO"})
    idOrder: number;
     
    @IsNotEmpty({message:"CAMPO idOrder OBRIGATÓRIO"})
    value: number;

    @IsOptional()
    processed: boolean ;
    
    @IsOptional()
    concluded: boolean ;

    
    @IsNotEmpty({message:"CAMPO idOrder OBRIGATÓRIO"})
    createdId: number;

    @IsOptional()
    updatedId: number | null;

    @IsOptional()
    paymentId: string;

    @IsOptional()
    tid: string;

    @IsOptional()
    authorizationCode: string;
    
    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
    
    @Exclude()
    deletedDate: string;  

    
 
    @Exclude()
    idOrder2: Order;
  }  
