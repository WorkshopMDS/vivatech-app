type Speaker = {
  name: string
}

export type Conference = {
  title: string
  description: string
  speaker: Speaker
  startAt: Date
  endAt: Date
  stage: number
  isPublished: boolean
}
