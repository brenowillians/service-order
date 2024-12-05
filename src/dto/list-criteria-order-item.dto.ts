import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class ListCriteriaOrderItemDto {
    
     
    @IsOptional()
    @IsInt()
    idOrder: number;

    @IsOptional()
    @IsInt()
    idProduct: number;

     
    @IsNotEmpty()
    @IsInt()
    items: number;

     
    @IsNotEmpty()
    @IsInt()
    page: number;

     
    //@IsNotEmpty()
    //ordenar por propriedades indiscriminadas da entidade
    order: { [key: string]: string }

}