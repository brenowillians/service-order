import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderItemDto } from 'src/dto/create-order-item.dto';
import { ListCriteriaOrderItemDto } from 'src/dto/list-criteria-order-item.dto';
import { UpdateOrderItemDto } from 'src/dto/update-order-item.dto';
import { OrderItem } from 'src/entities/order-item.entity';
import { Repository } from 'typeorm';



@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
      ) {}

      async create(createOrderItemDto: CreateOrderItemDto) {

        const orderItem: OrderItem = this.orderItemRepo.create(createOrderItemDto);
        return await this.orderItemRepo.save(orderItem); 

      }

      findAll() {
        return this.orderItemRepo.find()
      }

      findOne(id: number) {
        return this.orderItemRepo.findOne({where: {idOrderItem: id}})
      }

      update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
        return this.orderItemRepo.update(id, updateOrderItemDto)
      }

      remove(id: number) {

        return this.orderItemRepo.delete(id)
      }

      async list(data: ListCriteriaOrderItemDto) {

        try{
            let criteria  = {}
                         
            if (data.idOrder)
              criteria["idOrder"]=  data.idOrder 

            if (data.idProduct)
              criteria["idProduct"]=  data.idProduct 
    
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.orderItemRepo.findAndCount(
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