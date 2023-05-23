import { Buffer } from 'buffer'

export const encodeQRCode = (data?: any) => {
  const stringifiedData = JSON.stringify(data)
  const base64Data = Buffer.from(stringifiedData).toString('base64')
  return base64Data
}
