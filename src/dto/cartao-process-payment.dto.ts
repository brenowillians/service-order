export class CartaoProcessPaymentDTO {

    MerchantOrderId: string;
    Customer: CustomerProcess;
    Payment: PaymentProcess
}

export class CustomerProcess{
    Name:string
}

export class PaymentProcess{
    Capture: boolean;
    Type: string;
    Amount: number;
    Installments: number;
    SoftDescriptor: string;
    CreditCard: CreditCardProcess;
    IsCryptoCurrencyNegotiation: boolean
}

export class CreditCardProcess{
    CardNumber: string;
    Holder: string;
    ExpirationDate: string;
    SecurityCode: string;
    Brand:string;
}