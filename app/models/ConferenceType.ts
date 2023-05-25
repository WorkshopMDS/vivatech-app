type Speaker = {
  firstname: string
  lastname: string
}

export type IConference = {
  id: string
  title: string
  description: string
  speaker: Speaker[]
  startAt: Date
  endAt: Date
  stage: number
  isPublished: boolean
  interests: any[]
}
