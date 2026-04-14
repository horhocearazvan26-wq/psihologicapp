import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

// Supabase admin client (service role — bypasses RLS)
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const { user_id, plan, institution } = session.metadata ?? {}

    if (!user_id || !plan) {
      console.error('Missing metadata in checkout session:', session.id)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const supabase = getAdminClient()

    const updateData: Record<string, string | null> = {
      subscription_plan: plan,
    }

    if (plan === 'one_institution' && institution) {
      updateData.subscribed_institution = institution
    } else if (plan === 'all_institutions') {
      updateData.subscribed_institution = null
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user_id)

    if (error) {
      console.error('Failed to update profile after payment:', error)
      return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
    }

    console.log(`Plan activat: user=${user_id}, plan=${plan}, institution=${institution}`)
  }

  return NextResponse.json({ received: true })
}
