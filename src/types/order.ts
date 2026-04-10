export type OrderStatus =
  | "pending"
  | "paid"
  | "in_production"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod =
  | "mercadopago"
  | "transfer"
  | "cash"
  | "whatsapp";

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface OrderShippingAddress {
  street: string;
  number: string;
  apartment?: string;
  city: string;
  province: string;
  zip: string;
  notes?: string;
}

export interface OrderItemSnapshot {
  productId: string;
  productSlug: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  code: string;
  userId: string | null;
  customer: OrderCustomer;
  shippingAddress: OrderShippingAddress;
  items: OrderItemSnapshot[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentRef: string | null;
  status: OrderStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
