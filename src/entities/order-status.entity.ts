import { BoolBitTransformer, DateTransformer } from "@averbach/nest-shared-utils";

import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn

  } from "typeorm";
import { Order } from "./order.entity";
import { Status } from "./status.entity";


  @Index("PK_OrderStatus", ["idOrderStatus"], { unique: true })

  @Entity("orderStatus")
  export class OrderStatus {

    @PrimaryGeneratedColumn({ type: "int", name: "id_order_status" })
    idOrderStatus: number;

    @Column("int", { name: "id_order" })
    idOrder: number;

    @Column("int", { name: "id_status" })
    idStatus: number;
     
    @Column("varchar", { name: "description"})
    description: string ;
    
    @Column("int", { name: "created_id" })
    createdId: number;

    @Column("int", { name: "updated_id", nullable:true })
    updatedId: number | null;
    
    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
    
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  
 

    @ManyToOne(() => Order, (order) => order.orderStatus, {
      onDelete: "CASCADE"
    })
    @JoinColumn([{ name: "id_order", referencedColumnName: "idOrder" }])
    idOrder2: Order;


    @ManyToOne(() => Status, (status) => status.orderStatus)
    @JoinColumn([{ name: "id_status", referencedColumnName: "idStatus" }])
    idStatus2: Status;
  }  
