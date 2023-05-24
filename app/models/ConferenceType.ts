type Speaker = {
  name: string
}

export type Conference = {
  id: string
  title: string
  description: string
  speaker: Speaker
  startAt: Date
  endAt: Date
  stage: number
  isPublished: boolean
}
