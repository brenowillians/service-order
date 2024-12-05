import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ListCriteriaOrderItemDto } from 'src/dto/list-criteria-order-item.dto';
import { UpdateOrderItemDto } from 'src/dto/update-order-item.dto';
import { OrderItem } from 'src/entities/order-item.entity';
import { OrderItemService } from 'src/services/order-item.service';



@ApiTags('OrderItem') 
@Controller('orderItem')
export class OrderItemController {
    constructor(private readonly orderItem: OrderItemService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }

  @ApiCreatedResponse({
    type: OrderItem, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaOrderItemDto: ListCriteriaOrderItemDto) {
    return this.orderItem.list(listCriteriaOrderItemDto);
  }

  @ApiCreatedResponse({
    type: OrderItem, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createOrderItemDto: UpdateOrderItemDto) {
    return this.orderItem.create(createOrderItemDto);
  }

  @ApiCreatedResponse({
    type: OrderItem, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.orderItem.findAll();
  }

  @ApiCreatedResponse({
    type: OrderItem, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItem.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atualizado", 
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItem.update(+id, updateOrderItemDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", 
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItem.remove(+id);
  }

}
