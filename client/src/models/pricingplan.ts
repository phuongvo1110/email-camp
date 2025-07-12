export interface PricingPlan {
  _id: string
  name: string
  stripePriceId: string
  credits: number
  price: number
  currency: string
  interval: string
  isActive: boolean
  __v: number
}