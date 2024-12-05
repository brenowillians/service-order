import { CreditCardProcess, CustomerProcess } from "./cartao-process-payment.dto";

export class CartaoProcessPaymentResultDTO {

    MerchantOrderId: string;
    Customer: CustomerProcess;
    Payment: PaymentResult
}


class PaymentResult{
    ServiceTaxAmount: string;
    Installments: number;
    Interest: number;
    Capture: boolean;
    Authenticate: boolean;
    Recurrent: boolean;
    CreditCard: CreditCardProcess;
    IsSplitted: boolean;
    IsQrCode: boolean;
    IsCryptoCurrencyNegotiation: boolean;
    tryautomaticcancellation: boolean;
    ProofOfSale: string;
    Tid: string;
    AuthorizationCode: string;
    SoftDescriptor: string;
    Provider: string;
    PaymentId: string;
    Type: string;
    Amount: number;
    ReceivedDate: Date;
    Currency: string;
    Country: string;
    ExtraDataCollection: string;
    Status: number;
    ReturnCode: string;
    ReturnMessage: string;
    Links: LinkPayment[];

}

class LinkPayment{
    Method: string;
    Rel: string;
    Href: string
}