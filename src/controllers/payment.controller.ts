import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ListCriteriaPaymentDto } from 'src/dto/list-criteria-payment.dto';
import { UpdatePaymentDto } from 'src/dto/update-payment.dto';
import { Payment } from 'src/entities/payment.entity';
import { PaymentService } from 'src/services/payment.service';



@ApiTags('Payment') 
@Controller('payment')
export class PaymentController {
    constructor(
      private readonly payment: PaymentService
    ) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }

   
  @ApiCreatedResponse({
    type: Payment, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaPaymentDto: ListCriteriaPaymentDto) {
    return this.payment.list(listCriteriaPaymentDto);
  }
  

  @ApiCreatedResponse({
    type: Payment, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createPaymentDto: UpdatePaymentDto) {
    return this.payment.create(createPaymentDto);
  }

  @ApiCreatedResponse({
    type: Payment, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.payment.findAll();
  }

  @ApiCreatedResponse({
    type: Payment, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payment.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atualizado", 
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.payment.update(+id, updatePaymentDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", 
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payment.remove(+id);
  }

}
