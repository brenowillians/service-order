import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from 'src/dto/create-status.dto';
import { ListCriteriaStatusDto } from 'src/dto/list-criteria-status.dto';
import { UpdateStatusDto } from 'src/dto/update-status.dto';
import { Status } from 'src/entities/status.entity';
import { StatusService } from 'src/services/status.service';



@ApiTags('Status') 
@Controller('status')
export class StatusController {
    constructor(private readonly status: StatusService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }

  @ApiCreatedResponse({
    type: Status, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaStatusDto: ListCriteriaStatusDto) {
    return this.status.list(listCriteriaStatusDto);
  }

  @ApiCreatedResponse({
    type: Status, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.status.create(createStatusDto);
  }

  @ApiCreatedResponse({
    type: Status, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.status.findAll();
  }

  @ApiCreatedResponse({
    type: Status, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.status.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atualizado", 
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.status.update(+id, updateStatusDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", 
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.status.remove(+id);
  }

}
