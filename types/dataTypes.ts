export interface CurrencyInfo {
    id: string;
    name: string;
    symbol: string;
    code?: string
}

export interface CoinStatus {
    coinId: string;
    availability: boolean;
}