import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, STRIPE_PLANS, type StripePlan } from '@/lib/stripe'
import type { Institution } from '@/types'

const VALID_PLANS: StripePlan[] = ['one_institution', 'all_institutions']
const VALID_INSTITUTIONS: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const { searchParams } = new URL(request.url)
    const plan = searchParams.get('plan') as StripePlan | null
    const institution = searchParams.get('institution') as Institution | null

    if (!plan || !VALID_PLANS.includes(plan)) {
      return NextResponse.json({ error: 'Plan invalid' }, { status: 400 })
    }

    if (plan === 'one_institution' && (!institution || !VALID_INSTITUTIONS.includes(institution))) {
      return NextResponse.json({ error: 'Instituție invalidă pentru acest plan' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: STRIPE_PLANS[plan],
          quantity: 1,
        },
      ],
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        plan,
        institution: institution ?? '',
      },
      success_url: `${appUrl}/dashboard/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/pricing`,
    })

    return NextResponse.redirect(session.url!)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
