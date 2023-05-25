const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlrfnsmnp/upload'

export const uploadCVService = (base64Pdf: string) =>
  fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: JSON.stringify({
      file: base64Pdf,
      upload_preset: 'ml_default',
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.log(err)
    })
