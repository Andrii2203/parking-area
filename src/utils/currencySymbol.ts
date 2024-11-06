export const Currencys = ["USD", "EUR", "PLN"];
export const Symbols = ["$", "€", "zł"];

export function getDefaultCurrency() {
    return Currencys[0];
}

export const getCurrencySymbol = (currency: string | undefined) => {
  if(currency === undefined) {
    currency = getDefaultCurrency();
  }

  for(let i = 0; i< Currencys.length; i++) {
    return Symbols[Currencys.indexOf(currency)];
  }

}