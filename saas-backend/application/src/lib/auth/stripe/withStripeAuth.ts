import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

/**
 * Stripe webhook handler function type.
 * Receives a verified Stripe event and returns a NextResponse.
 */
type Handler = (event: Stripe.Event) => Promise<NextResponse>;

/**
 * Stripe client instance.
 * Uses the exact API version required by the installed Stripe SDK.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-08-27.basil',
});

/**
 * Middleware wrapper to securely verify Stripe webhook events.
 *
 * This function:
 * 1. Reads the raw request body
 * 2. Verifies the Stripe signature
 * 3. Constructs a trusted Stripe event
 * 4. Passes the event to the provided handler
 *
 * @param handler - Business logic handler for the verified Stripe event
 * @returns Next.js route handler with Stripe verification applied
 */
export function withStripeAuth(handler: Handler) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      const body = await req.text();

      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch {
      return NextResponse.json(
        { error: 'Invalid Stripe signature' },
        { status: 400 }
      );
    }

    return handler(event);
  };
}
