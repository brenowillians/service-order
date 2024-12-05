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


  
  @Index("PK_Payment", ["idPayment"], { unique: true })

  @Entity("payment")
  export class Payment {

    @PrimaryGeneratedColumn({ type: "int", name: "id_payment" })
    idPayment: number;

    @Column("int", { name: "id_order" })
    idOrder: number;
     
    @Column('decimal', { name: 'value', precision: 10, scale: 2 })
    value: number;

    @Column("bit", { name: "processed", nullable:true, transformer: new BoolBitTransformer })
    processed: boolean ;
    
    @Column("bit", { name: "concluded", nullable:true, transformer: new BoolBitTransformer })
    concluded: boolean ;

    @Column("varchar", { name: "paymentId", nullable:true})
    paymentId: string ;

    @Column("varchar", { name: "tid", nullable:true})
    tid: string ;

    @Column("varchar", { name: "authorizationCode", nullable:true})
    authorizationCode: string ;
    
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

    
 
    @ManyToOne(() => Order, (order) => order.payment, {
      onDelete: "CASCADE"
    })
    @JoinColumn([{ name: "id_order", referencedColumnName: "idOrder" }])
    idOrder2: Order;

    
  }  