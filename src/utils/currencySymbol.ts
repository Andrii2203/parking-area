export const Currencys = ["USD", "EUR", "PLN"];

export function getDefaultCurrency() {
    return Currencys[0];
}

export const getCurrencySymbol = (currency: string | undefined) => {
  
  if(currency === undefined) {
    currency = getDefaultCurrency();
  }
  
  switch(currency) {
    case "EUR": 
      return "€";
    case "PLN":
      return "zł";
    case "USD":
      default:
        return "$";
  }
}