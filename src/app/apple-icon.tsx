import { createAppIconResponse } from './icon-template'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return createAppIconResponse(size.width)
}
