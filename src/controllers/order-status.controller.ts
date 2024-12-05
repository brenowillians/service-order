import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderStatusDto } from 'src/dto/create-order-status.dto';
import { ListCriteriaOrderStatusDto } from 'src/dto/list-criteria-order-status.dto';
import { UpdateOrderStatusDto } from 'src/dto/update-order-Status.dto';
import { OrderStatus } from 'src/entities/order-status.entity';
import { OrderStatusService } from 'src/services/order-status.service';




@ApiTags('OrderStatus') 
@Controller('order-status')
export class OrderStatusController {
    constructor(
      private readonly orderStatus: OrderStatusService,
    ) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
   
  @ApiCreatedResponse({
    type: OrderStatus, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaOrderStatusDto: ListCriteriaOrderStatusDto) {
    return this.orderStatus.list(listCriteriaOrderStatusDto);
  }

  @ApiCreatedResponse({
    type: OrderStatus, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatus.create(createOrderStatusDto);
  }

  @ApiCreatedResponse({
    type: OrderStatus, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.orderStatus.findAll();
  }

  @ApiCreatedResponse({
    type: OrderStatus, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatus.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atualizado", 
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.orderStatus.update(+id, updateOrderStatusDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", 
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatus.remove(+id);
  }

}
