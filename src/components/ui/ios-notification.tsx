'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain } from 'lucide-react'

export function IosNotification() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div style={{
      position: 'absolute',
      top: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(390px, calc(100vw - 32px))',
      zIndex: 20,
      animation: 'notifDrop 0.65s cubic-bezier(0.34,1.48,0.64,1) 0.8s both',
    }}>
      {/* Notification pill */}
      <div style={{
        borderRadius: 26,
        background: 'rgba(235,235,240,0.92)',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95)',
        backdropFilter: 'blur(48px) saturate(220%)',
        WebkitBackdropFilter: 'blur(48px) saturate(220%)',
        overflow: 'hidden',
      }}>
        {/* Main content */}
        <div style={{ padding: '14px 16px 12px' }}>
          {/* Top row: app info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(145deg,#2563eb,#7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 3px 10px rgba(37,99,235,0.4)',
            }}>
              <Brain style={{ width: 20, height: 20, color: 'white' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1c1c1e', letterSpacing: '0.02em', textTransform: 'uppercase' }}>PsihoPrep</span>
                <span style={{ fontSize: 12, color: '#8e8e93' }}>acum</span>
              </div>
            </div>
          </div>

          {/* Title + body */}
          <div style={{ paddingLeft: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', lineHeight: 1.3, marginBottom: 3 }}>
              🔴 Sesiunea ANP este activă
            </div>
            <div style={{ fontSize: 14, color: '#3c3c43cc', lineHeight: 1.45 }}>
              Dosarul + psihologicul sunt în desfășurare. Intră pregătit.
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(60,60,67,0.13)' }} />

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <button
            onClick={() => setDismissed(true)}
            style={{
              padding: '13px 16px',
              background: 'transparent',
              border: 'none',
              borderRight: '1px solid rgba(60,60,67,0.13)',
              fontSize: 15,
              fontWeight: 500,
              color: '#3c3c43',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            Ignoră
          </button>
          <Link
            href="/auth/register?institution=ANP"
            style={{
              padding: '13px 16px',
              background: 'transparent',
              border: 'none',
              fontSize: 15,
              fontWeight: 700,
              color: '#2563eb',
              textDecoration: 'none',
              textAlign: 'center',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Pregătește-te →
          </Link>
        </div>
      </div>
    </div>
  )
}
