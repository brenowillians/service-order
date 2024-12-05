import { BoolBitTransformer, DateTransformer } from "@averbach/nest-shared-utils";

import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany

  } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { OrderStatus } from "./order-status.entity";
import { Payment } from "./payment.entity";


  @Index("PK_Order", ["idOrder"], { unique: true })

  @Entity("order")
  export class Order {

    @PrimaryGeneratedColumn({ type: "int", name: "id_order" })
    idOrder: number;
    
    @Column("timestamp", { name: "orderdate", transformer: new DateTransformer})
    orderDate: string ;

    @Column("int", { name: "id_user_site" })
    idUserSite: number;

    @Column("varchar", { name: "details"})
    details: string ;

    @Column("bit", { name: "active", nullable:true, transformer: new BoolBitTransformer })
    active: boolean ;
    
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
 
    @OneToMany(
      () => OrderItem,
      (orderItem) => orderItem.idOrder2
    )

    orderItems: OrderItem[];

    @OneToMany(
      () => OrderStatus,
      (orderStatus) => orderStatus.idOrder2
    )

    orderStatus: OrderStatus[];

    @OneToMany(
      () => Payment,
      (payment) => payment.idOrder2
    )

    payment: Payment[];

    
  }  

