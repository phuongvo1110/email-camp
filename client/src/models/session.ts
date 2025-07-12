export interface Session {
  subscription_id: string
  status: string
  customer_email: string
  product: Product
  price: Price
}

export interface Product {
  id: string
  name: string
  description: string;
  metadata: Metadata
  images: []
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Metadata {}

export interface Price {
  id: string
  unit_amount: number
  currency: string
  interval: string
}
