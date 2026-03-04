'use client'

import { useState } from 'react'
import {
  PaymentElement as StripePaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import type { PaymentElementProps } from './types'

/**
 * Secure payment form component.
 *
 * Wraps Stripe's PaymentElement with form submission logic.
 * Must be rendered inside a BillingProvider.
 *
 * @example
 * ```tsx
 * <PaymentElement
 *   onSuccess={(pi) => router.push('/success')}
 *   onError={(err) => toast.error(err.message)}
 *   returnUrl="https://example.com/checkout/complete"
 *   submitLabel="Pay $10.00"
 * />
 * ```
 */
export function PaymentElement({
  onSuccess,
  onError,
  returnUrl,
  submitLabel = 'Pay',
}: PaymentElementProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setErrorMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl || window.location.href,
      },
      redirect: 'if_required',
    })

    if (error) {
      const msg = error.message || 'Payment failed'
      setErrorMessage(msg)
      onError?.({ message: msg })
      setLoading(false)
    } else if (paymentIntent) {
      onSuccess?.({
        id: paymentIntent.id,
        status: paymentIntent.status,
      })
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <StripePaymentElement />
      {errorMessage && (
        <div role="alert" style={{ color: '#df1b41', marginTop: 8, fontSize: 14 }}>
          {errorMessage}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{ marginTop: 16, width: '100%' }}
      >
        {loading ? 'Processing...' : submitLabel}
      </button>
    </form>
  )
}
