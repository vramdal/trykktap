import React from 'react'

export type FormStateType = {
  destinasjonTrykk: number
  avstand: number
  hoydeforskjell: number
  diameter: string
  vannmengde: string
  pumpetype: string
}
export type ReactNodeWrapper = (element: React.ReactNode) => React.ReactNode
