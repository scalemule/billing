/**
 * @scalemule/billing
 *
 * Client-side payment UI components for ScaleMule marketplace.
 * Wraps Stripe Elements for secure card input — keeps the heavy
 * Stripe.js dependency out of the main @scalemule/sdk and @scalemule/nextjs packages.
 *
 * Required peer dependencies:
 *   @stripe/stripe-js >= 2.0.0
 *   @stripe/react-stripe-js >= 2.0.0
 *   react >= 18.0.0
 *
 * CSP domains to allowlist:
 *   js.stripe.com, api.stripe.com, *.stripe.network
 *
 * @example
 * ```tsx
 * import { BillingProvider, SetupElement } from '@scalemule/billing'
 * import { useBilling } from '@scalemule/nextjs'
 *
 * function SavePaymentMethod() {
 *   const { createSetupSession } = useBilling()
 *   const [clientSecret, setClientSecret] = useState<string | null>(null)
 *
 *   useEffect(() => {
 *     createSetupSession({
 *       return_url: window.location.href,
 *       cancel_url: window.location.href,
 *     }).then((secret) => {
 *       if (secret) setClientSecret(secret)
 *     })
 *   }, [])
 *
 *   if (!clientSecret) return <p>Loading...</p>
 *
 *   return (
 *     <BillingProvider
 *       publishableKey={process.env.NEXT_PUBLIC_STRIPE_PK!}
 *       clientSecret={clientSecret}
 *     >
 *       <SetupElement
 *         onSuccess={() => router.refresh()}
 *         submitLabel="Save payment method"
 *       />
 *     </BillingProvider>
 *   )
 * }
 * ```
 */

export { BillingProvider } from './BillingProvider'
export { PaymentElement } from './PaymentElement'
export { SetupElement } from './SetupElement'
export type { BillingDetailsInput, BillingProviderProps, PaymentElementProps, SetupElementProps } from './types'
