
export interface NumberInsight {
  is_prime: boolean;
  explanation: string;
  historical_context: string;
  fun_fact: string;
}

export enum CalculationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
