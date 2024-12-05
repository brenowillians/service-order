import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from 'src/dto/create-payment.dto';
import { ListCriteriaPaymentDto } from 'src/dto/list-criteria-payment.dto';
import { UpdatePaymentDto } from 'src/dto/update-payment.dto';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';



@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
      ) {}

      async create(createPaymentDto: CreatePaymentDto) {

        const payment: Payment = this.paymentRepo.create(createPaymentDto);
        return await this.paymentRepo.save(payment); 

      }

      findAll() {
        return this.paymentRepo.find()
      }

      findOne(id: number) {
        return this.paymentRepo.findOne({where: {idPayment: id}})
      }

      update(id: number, updatePaymentDto: UpdatePaymentDto) {
        return this.paymentRepo.update(id, updatePaymentDto)
      }

      remove(id: number) {

        return this.paymentRepo.delete(id)
      }

      async list(data: ListCriteriaPaymentDto) {

        try{
            let criteria  = {}
            
                          
            if (data.idOrder)
              criteria["idOrder"]=  data.idOrder 

           
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.paymentRepo.findAndCount(
                {
                    where: criteria,
                    order: data.order,
                    take: take,
                    skip: skip
                }
            );
    
            if(!result || result.length===0){
                throw new NotFoundException('nothing to show'); 
            }
    
    
            return {
                status: 200,
                data: {result: result, total: total},
                message:'list in data.result and total in data.total',
                error: null
            }
        }
        catch(error){
            if(error instanceof NotFoundException){            
                return {
                    status: 404,
                    data: null,
                    message:error.message,
                    error: error.message
                }
            }
    
            return {
                status: 400,
                data: null,
                message:error.message,
                error: error.stack
            }           
        }    
        
      }
}