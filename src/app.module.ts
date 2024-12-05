import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';
import { OrderStatusService } from 'src/services/order-status.service';
import { OrderStatusController } from './controllers/order-status.controller';
import { OrderStatus } from './entities/order-status.entity';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { Payment } from './entities/payment.entity';
import { ConfigModule } from '@nestjs/config';
import { Status } from './entities/status.entity';
import { StatusService } from './services/status.service';
import { StatusController } from './controllers/status.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
      synchronize: true, // never true in production!
    }),
    TypeOrmModule.forFeature([Order, OrderItem, OrderStatus, Payment, Status]),
    HttpModule
  ],
  
  controllers: [AppController, OrderController, OrderItemController, OrderStatusController, PaymentController, StatusController],
  providers: [AppService, OrderService, OrderItemService, OrderStatusService, PaymentService, StatusService],
})
export class AppModule {}
