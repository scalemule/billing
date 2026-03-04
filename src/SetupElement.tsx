'use client'

import { useState } from 'react'
import {
  PaymentElement as StripePaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import type { SetupElementProps } from './types'

/**
 * Card setup form component (no immediate charge).
 *
 * Used to collect and save a payment method for future use.
 * Must be rendered inside a BillingProvider with a setup intent client secret.
 *
 * @example
 * ```tsx
 * <SetupElement
 *   onSuccess={(si) => toast.success('Card saved!')}
 *   onError={(err) => toast.error(err.message)}
 *   returnUrl="https://example.com/settings/billing"
 *   submitLabel="Save Card"
 * />
 * ```
 */
export function SetupElement({
  onSuccess,
  onError,
  returnUrl,
  submitLabel = 'Save Card',
  billingDetails,
  disabled = false,
}: SetupElementProps) {
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

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: returnUrl || window.location.href,
        payment_method_data: billingDetails ? { billing_details: billingDetails } : undefined,
      },
      redirect: 'if_required',
    })

    if (error) {
      const msg = error.message || 'Setup failed'
      setErrorMessage(msg)
      onError?.({ message: msg })
      setLoading(false)
    } else if (setupIntent) {
      onSuccess?.({
        id: setupIntent.id,
        status: setupIntent.status,
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
        disabled={!stripe || loading || disabled}
        style={{ marginTop: 16, width: '100%' }}
      >
        {loading ? 'Processing...' : submitLabel}
      </button>
    </form>
  )
}
