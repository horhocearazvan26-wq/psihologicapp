'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import type { GuideProductId } from '@/lib/guides'

interface GuideCheckoutButtonProps {
  productId: GuideProductId
  label: string
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

export function GuideCheckoutButton({
  productId,
  label,
  disabled = false,
  className,
  style,
}: GuideCheckoutButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleCheckout() {
    if (disabled || loading) return
    setLoading(true)
    const params = new URLSearchParams({ product: productId })
    router.push(`/api/stripe/checkout?${params.toString()}`)
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={disabled || loading}
      className={className}
      style={style}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Se deschide checkout-ul...
        </>
      ) : disabled ? (
        'Preț indisponibil momentan'
      ) : (
        <>
          {label}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  )
}
