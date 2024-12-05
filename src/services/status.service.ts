import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStatusDto } from 'src/dto/create-status.dto';
import { ListCriteriaStatusDto } from 'src/dto/list-criteria-status.dto';
import { UpdateStatusDto } from 'src/dto/update-status.dto';
import { Status } from 'src/entities/status.entity';
import { Repository } from 'typeorm';



@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private statusRepo: Repository<Status>,
      ) {}

      async create(createStatusDto: CreateStatusDto) {

        const status: Status = this.statusRepo.create(createStatusDto);
        return await this.statusRepo.save(status); 

      }

      findAll() {
        return this.statusRepo.find()
      }

      findOne(id: number) {
        return this.statusRepo.findOne({where: {idStatus: id}})
      }

      update(id: number, updateStatusDto: UpdateStatusDto) {
        return this.statusRepo.update(id, updateStatusDto)
      }

      remove(id: number) {

        return this.statusRepo.delete(id)
      }

      async list(data: ListCriteriaStatusDto) {

        try{
            let criteria  = {}
                          
            if (data.description)
              criteria["description"]=  data.description 

           
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.statusRepo.findAndCount(
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