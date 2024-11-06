export enum Currencys {
    USD = "USD",
    EUR = "EUR",
    PLN = "PLN"
}

export interface CurrencyType {
    currency: Currencys;
}

export function getDefaultCurrency() {
    return Currencys.USD;
}