import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Order } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';


export class UpdatePaymentDto implements Payment{

    

    @Exclude()
    idPayment: number;    

    @IsOptional()
    idOrder: number;
     
    @IsOptional()
    value: number;

    @IsOptional()
    @IsBoolean()
    processed: boolean ;
    
    @IsOptional()
    @IsBoolean()
    concluded: boolean ;

    
    @IsOptional()
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
