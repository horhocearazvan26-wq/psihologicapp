import { createAppIconResponse } from '@/app/icon-template'

export async function GET() {
  return createAppIconResponse(512)
}
