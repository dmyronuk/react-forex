export interface AdaptedRatesResponse {
  [country: string]: {
    rate: number;
    change: number;
  }
}
