import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderStatusDto } from 'src/dto/create-order-status.dto';
import { ListCriteriaOrderStatusDto } from 'src/dto/list-criteria-order-status.dto';
import { UpdateOrderStatusDto } from 'src/dto/update-order-status.dto';
import { OrderStatus } from 'src/entities/order-status.entity';
import { Repository } from 'typeorm';



@Injectable()
export class OrderStatusService {
    constructor(
        @InjectRepository(OrderStatus) private orderStatusRepo: Repository<OrderStatus>,
      ) {}

      async create(createOrderStatusDto: CreateOrderStatusDto) {

        const orderStatus: OrderStatus = this.orderStatusRepo.create(createOrderStatusDto);
        return await this.orderStatusRepo.save(orderStatus); 

      }

      findAll() {
        return this.orderStatusRepo.find()
      }

      findOne(id: number) {
        return this.orderStatusRepo.findOne({where: {idOrderStatus: id}})
      }

      update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.orderStatusRepo.update(id, updateOrderStatusDto)
      }

      remove(id: number) {

        return this.orderStatusRepo.delete(id)
      }

      async list(data: ListCriteriaOrderStatusDto) {

        try{
            let criteria  = {}
            
                         
            if (data.idOrder)
              criteria["idOrder"]=  data.idOrder 

            if (data.idStatus)
              criteria["idStatus"]=  data.idStatus 
    
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.orderStatusRepo.findAndCount(
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