'use client'

import { useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import type { StripeElementLocale } from '@stripe/stripe-js'
import type { BillingProviderProps } from './types'

/**
 * Wraps Stripe Elements context for secure payment UI.
 *
 * Must wrap PaymentElement or SetupElement. Requires a publishableKey
 * (your Stripe publishable key) and a clientSecret (from createPayment
 * or createSetupSession).
 *
 * @example
 * ```tsx
 * import { BillingProvider, PaymentElement } from '@scalemule/billing'
 *
 * function CheckoutPage({ clientSecret }: { clientSecret: string }) {
 *   return (
 *     <BillingProvider
 *       publishableKey="pk_live_..."
 *       clientSecret={clientSecret}
 *     >
 *       <PaymentElement
 *         onSuccess={(pi) => console.log('Paid!', pi.id)}
 *         returnUrl="https://example.com/success"
 *       />
 *     </BillingProvider>
 *   )
 * }
 * ```
 */
export function BillingProvider({
  publishableKey,
  clientSecret,
  children,
  appearance,
  locale,
  stripeConnectedAccountId,
}: BillingProviderProps) {
  const stripePromise = useMemo(
    () => loadStripe(publishableKey, stripeConnectedAccountId ? { stripeAccount: stripeConnectedAccountId } : undefined),
    [publishableKey, stripeConnectedAccountId]
  )

  const options = useMemo(
    () => ({
      clientSecret,
      appearance,
      locale: locale as StripeElementLocale | undefined,
    }),
    [clientSecret, appearance, locale]
  )

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
