export interface Delivery {
    id: string;
    reference: number;
    startDate: string;
    updateDate: string;
    shippingTypeId: string;
    carrierTypeId: string;
    deliveryDate: string;
    quantity: number;
    price: number;
    discount: number;
    acceptCondition: boolean;
    clientId: string;
}
