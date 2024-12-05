import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { ListCriteriaOrderDto } from 'src/dto/list-criteria-order.dto';
import { MakeOrderDto } from 'src/dto/make-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { Order } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service';



@ApiTags('Order') 
@Controller('order')
export class OrderController {
    constructor(private readonly order: OrderService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }

  @ApiCreatedResponse({
    type: Order, // aqui definimos o tipo de resposta
  }) 
  @Post('make-order')
  makeOrder(@Body() makeOrderDto: MakeOrderDto) {
    return this.order.makeOrder(makeOrderDto);
  }

  @ApiCreatedResponse({
    type: Order, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaOrderDto: ListCriteriaOrderDto) {
    return this.order.list(listCriteriaOrderDto);
  }

  @ApiCreatedResponse({
    type: Order, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.order.create(createOrderDto);
  }

  @ApiCreatedResponse({
    type: Order, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.order.findAll();
  }

  @ApiCreatedResponse({
    type: Order, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.order.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atualizado", 
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.order.update(+id, updateOrderDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", 
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.order.remove(+id);
  }

}
