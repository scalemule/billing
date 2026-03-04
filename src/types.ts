import type { Appearance } from '@stripe/stripe-js'

export interface BillingDetailsInput {
  name?: string
  email?: string
  phone?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
}

export interface BillingProviderProps {
  publishableKey: string
  clientSecret: string
  children: React.ReactNode
  appearance?: Appearance
  locale?: string
  /** Stripe connected account ID (acct_xxx) for connected account payments/subscriptions */
  stripeConnectedAccountId?: string
}

export interface PaymentElementProps {
  onSuccess?: (paymentIntent: { id: string; status: string }) => void
  onError?: (error: { message: string }) => void
  returnUrl?: string
  submitLabel?: string
}

export interface SetupElementProps {
  onSuccess?: (setupIntent: { id: string; status: string }) => void
  onError?: (error: { message: string }) => void
  returnUrl?: string
  submitLabel?: string
  billingDetails?: BillingDetailsInput
  disabled?: boolean
}
