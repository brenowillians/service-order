/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { ListCriteriaOrderDto } from 'src/dto/list-criteria-order.dto';
import { MakeOrderDto } from 'src/dto/make-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { PaymentService } from './payment.service';
import { OrderStatusService } from './order-status.service';
import { OrderItemService } from './order-item.service';
import { CreateOrderStatusDto } from 'src/dto/create-order-status.dto';
import { Status } from 'src/entities/status.entity';
import { StatusService } from './status.service';
import { ListCriteriaStatusDto } from 'src/dto/list-criteria-status.dto';
import { CreatePaymentDto } from 'src/dto/create-payment.dto';
import { HttpService } from '@nestjs/axios';
import {
  CartaoProcessPaymentDTO,
  CreditCardProcess,
  CustomerProcess,
  PaymentProcess,
} from 'src/dto/cartao-process-payment.dto';
import { CartaoProcessPaymentResultDTO } from 'src/dto/cartao-process-payment-result.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private paymentService: PaymentService,
    private orderStatusService: OrderStatusService,
    private orderItemService: OrderItemService,
    private statusService: StatusService,
    private readonly httpService: HttpService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order: Order = this.orderRepo.create(createOrderDto);
    return await this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

  findOne(id: number) {
    return this.orderRepo.findOne({ where: { idOrder: id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepo.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }

  async list(data: ListCriteriaOrderDto) {
    try {
      const criteria = {};

      if (data.active) {
        criteria['active'] = true;
      } else {
        if (data.active == false) {
          criteria['active'] = false;
        }
      }

      if (data.idUserSite) criteria['idUserSite'] = data.idUserSite;

      if (data.orderDate) criteria['orderDate'] = data.orderDate;

      const take = data.items || 10;
      const page = data.page || 1;
      const skip = (page - 1) * take;

      const [result, total] = await this.orderRepo.findAndCount({
        where: criteria,
        order: data.order,
        take: take,
        skip: skip,
      });

      if (!result || result.length === 0) {
        throw new NotFoundException('nothing to show');
      }

      return {
        status: 200,
        data: { result: result, total: total },
        message: 'list in data.result and total in data.total',
        error: null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 404,
          data: null,
          message: error.message,
          error: error.message,
        };
      }

      return {
        status: 400,
        data: null,
        message: error.message,
        error: error.stack,
      };
    }
  }

  async makeOrder(makeOrderDto: MakeOrderDto) {
    const processmentIds = {
      idOrder: 0,
      idsOrderItem: [],
      idsOrderStatus: [],
      idPayment: 0,
    };

    const returnprocessment = {
      idOrder: 0,
      message: '',
    };

    try {
      //Steps:
      //1) Criar o registro order
      const createOrderDto: CreateOrderDto = {
        idOrder: 0,
        orderDate: new Date().toISOString(),
        idUserSite: makeOrderDto.idUserSite,
        details: makeOrderDto.details,
        active: true,
        createdId: 0,
        updatedId: 0,
        createdDate: null,
        updatedDate: null,
        deletedDate: null,
        orderItems: [],
        orderStatus: [],
        payment: [],
      };
      delete createOrderDto.idOrder;
      delete createOrderDto.createdDate;
      delete createOrderDto.updatedDate;
      delete createOrderDto.deletedDate;
      const orderinsert: Order = this.orderRepo.create(createOrderDto);
      const order = await this.orderRepo.save(orderinsert);
      processmentIds.idOrder = order.idOrder;

      //2) Pegar o id do pedido criado e criar os itens do pedido(OrderItems)
      let orderValue = 0;
      for (const orderItem of makeOrderDto.orderItems) {
        orderItem.idOrder = order.idOrder;
        const resultOrderItem = await this.orderItemService.create(orderItem);
        orderValue += orderItem.quantity * orderItem.price;
        processmentIds.idsOrderItem.push(resultOrderItem.idOrderItem);
      }

      //3) Inseir o registro no OrderStaus como Aguardando Pagamento.

      const idOrderStatusWaiting = await this.insertOrderStatus(
        'Aguardando Pagamento',
        order.idOrder,
      );

      if (idOrderStatusWaiting) {
        //4) Processar o pagamento

        const authenticationCielo = {
          headers: {
            merchantId: process.env.API_CIELO_ID,
            merchantKey: process.env.API_CIELO_KEY,
          },
        };

        const customer = new CustomerProcess();
        customer.Name = makeOrderDto.creditCardOwner;

        const payment = new PaymentProcess();
        payment.Amount = orderValue * 100;
        payment.Capture = true;
        payment.Installments = 1;
        payment.IsCryptoCurrencyNegotiation = false;
        payment.SoftDescriptor = 'LojaB';
        payment.Type = 'CreditCard';

        const creditCard = new CreditCardProcess();
        creditCard.Brand = 'Visa';
        creditCard.CardNumber = makeOrderDto.creditCardNumber;
        //creditCard.CardNumber= "4066559956472214";
        creditCard.ExpirationDate = makeOrderDto.expirationDate;
        creditCard.Holder = makeOrderDto.creditCardOwner;
        creditCard.SecurityCode = makeOrderDto.cvc;
        payment.CreditCard = creditCard;

        const paymentProcess = new CartaoProcessPaymentDTO();
        paymentProcess.MerchantOrderId = order.idOrder.toString();
        paymentProcess.Customer = customer;
        paymentProcess.Payment = payment;

        try {
          const { data: result } = await this.httpService.axiosRef.post(
            process.env.API_CIELO,
            paymentProcess,
            authenticationCielo,
          );

          const cartaoProcessPaymentResultDTO: CartaoProcessPaymentResultDTO =
            result;

          if (cartaoProcessPaymentResultDTO.Payment.Status == 2) {
            const createPaymentDto: CreatePaymentDto = {
              idPayment: 0,
              idOrder: order.idOrder,
              value: orderValue,
              processed: true,
              concluded: false,
              createdId: 0,
              updatedId: 0,
              createdDate: '',
              updatedDate: '',
              deletedDate: '',
              idOrder2: new Order(),
              paymentId: cartaoProcessPaymentResultDTO.Payment.PaymentId,
              tid: cartaoProcessPaymentResultDTO.Payment.Tid,
              authorizationCode:
                cartaoProcessPaymentResultDTO.Payment.AuthorizationCode,
            };

            delete createPaymentDto.idPayment;
            delete createPaymentDto.createdDate;
            delete createPaymentDto.updatedDate;
            delete createPaymentDto.deletedDate;
            delete createPaymentDto.idOrder2;

            await this.paymentService.create(createPaymentDto);

            await this.insertOrderStatus('Pagamento Processado', order.idOrder);

            returnprocessment.idOrder = processmentIds.idOrder;
            returnprocessment.message = 'Pagamento Aprovado';
          } else {
            returnprocessment.idOrder = processmentIds.idOrder;
            returnprocessment.message =
              'Não foi possível processar o pagamento. tente novamente';
          }
        } catch {
          returnprocessment.idOrder = processmentIds.idOrder;
          returnprocessment.message =
            'Não foi possível processar o pagamento. tente novamente';
        }
      }
      return returnprocessment;
    } catch (error) {
      if (processmentIds.idPayment) {
        await this.paymentService.remove(processmentIds.idPayment);
      }

      if (processmentIds.idsOrderStatus.length) {
        for (const idOrderStatus of processmentIds.idsOrderStatus) {
          await this.orderStatusService.remove(idOrderStatus);
        }
      }

      if (processmentIds.idsOrderItem.length) {
        for (const idOrderItem of processmentIds.idsOrderItem) {
          await this.orderItemService.remove(idOrderItem);
        }
      }
      if (processmentIds.idOrder) {
        await this.remove(processmentIds.idOrder);
      }

      returnprocessment.message =
        'Não foi possível realizar o pedido. tente novamente';
      return returnprocessment;
    }
  }

  async insertOrderStatus(
    description: string,
    idOrder: number,
  ): Promise<number> {
    const statusCriteria: ListCriteriaStatusDto = {
      description: description, //'Aguardando Pagamento',
      items: 1,
      page: 1,
      order: { description: 'ASC' },
    };
    const statusResult = await this.statusService.list(statusCriteria);
    if (statusResult.data.total) {
      const status = statusResult.data.result[0];

      const createOrderStatusDto: CreateOrderStatusDto = {
        idOrderStatus: 0,
        idOrder: idOrder,
        idStatus: status.idStatus,
        description: status.description,
        createdId: 0,
        updatedId: 0,
        createdDate: '',
        updatedDate: '',
        deletedDate: '',
        idOrder2: new Order(),
        idStatus2: new Status(),
      };

      delete createOrderStatusDto.idOrderStatus;
      delete createOrderStatusDto.createdDate;
      delete createOrderStatusDto.updatedDate;
      delete createOrderStatusDto.deletedDate;
      delete createOrderStatusDto.idOrder2;
      delete createOrderStatusDto.idStatus2;
      const resultOrderStatus = await this.orderStatusService.create(
        createOrderStatusDto,
      );
      //processmentIds.idsOrderStatus.push(resultOrderStatus.idOrderStatus)
      return resultOrderStatus.idOrderStatus;
    } else {
      return 0;
    }
  }
}
