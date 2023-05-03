import { Buffer } from 'buffer'

const Exemple = {
  id: 'EJK0G2',
  validityPeriod: [
    '2023-05-01T20:46:27.989+00:00',
    '2023-05-08T20:46:27.989+00:00',
  ],
  buyDate: '2023-05-01T20:41:28.003+00:00',
  user: '644ffde890a5f62feca7896e',
}

export const encodeQRCode = (data?: any) => {
  const stringifiedData = JSON.stringify(data || Exemple)
  const base64Data = Buffer.from(stringifiedData).toString('base64')
  return base64Data
}
