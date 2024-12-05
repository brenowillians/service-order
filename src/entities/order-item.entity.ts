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


  @Index("PK_OrderItems", ["idOrderItem"], { unique: true })

  @Entity("orderItem")
  export class OrderItem {

    @PrimaryGeneratedColumn({ type: "int", name: "id_order_item" })
    idOrderItem: number;

    @Column("int", { name: "id_order" })
    idOrder: number;

    @Column("int", { name: "id_product" })
    idProduct: number;

    @Column("int", { name: "quantity" })
    quantity: number;
    
    @Column("varchar", { name: "productname"})
    productName: string ;

    @Column('decimal', { name: 'price', precision: 10, scale: 2 })
    price: number;


    /*@Column("bit", { name: "active", nullable:true, transformer: new BoolBitTransformer })
    active: boolean ;*/
    
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

    
 
    @ManyToOne(() => Order, (order) => order.orderItems, {
      onDelete: "CASCADE"
    })
    @JoinColumn([{ name: "id_order", referencedColumnName: "idOrder" }])
    idOrder2: Order;

    
  }  

