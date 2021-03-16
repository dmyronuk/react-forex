export interface HistoryResponse {
  rates: {
    [date: string]: {
      [country: string]: number
    }
  },
  base: string
  date: string
}