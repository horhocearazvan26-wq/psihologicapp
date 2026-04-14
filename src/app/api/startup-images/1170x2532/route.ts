import { createStartupImageResponse } from '@/app/startup-image-template'

export async function GET() {
  return createStartupImageResponse(1170, 2532)
}
