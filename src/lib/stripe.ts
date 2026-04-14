import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export const STRIPE_PLANS = {
  one_institution: process.env.STRIPE_PRICE_ONE_INSTITUTION!,
  all_institutions: process.env.STRIPE_PRICE_ALL_INSTITUTIONS!,
} as const

export type StripePlan = keyof typeof STRIPE_PLANS
