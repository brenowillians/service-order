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
import { OrderStatus } from "./order-status.entity";


  @Index("PK_Status", ["idStatus"], { unique: true })

  @Entity("status")
  export class Status {

    @PrimaryGeneratedColumn({ type: "int", name: "id_status" })
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
    
    @OneToMany(
        () => OrderStatus,
        (orderStatus) => orderStatus.idStatus2
      )
  
    orderStatus: OrderStatus[];
  }  
