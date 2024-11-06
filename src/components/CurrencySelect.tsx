import { Currencys } from "../utils/currencySymbol";

export interface CurrencyParameter {
    selectedCurrency : string,
    handleCurrencyChange: (newCurrency: string) => void,
}
  
const CurrencySelect = (props:CurrencyParameter) => {

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value
        props.handleCurrencyChange(newCurrency);
   
    };

    return(
        <div>
            <label>Select Currency: </label>
            <select 
            value={props.selectedCurrency}
            onChange={handleCurrencyChange}
            className="dropdown-list"
        >
            {Currencys.map((currency) => (
            <option 
                className="dropdown-list-item" 
                value={currency}>
                {currency}
            </option>
            ))}
        </select>
        </div>
    );
};

export default CurrencySelect;