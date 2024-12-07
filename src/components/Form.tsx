import React from "react";
import { FormData } from "../utils/formData";
import CurrencySelect from "./CurrencySelect";
import { default as handleChange } from "../handle/handleChange";
import { handleUpdate } from "../imports";
import { handleGetData } from "../imports";
import { handleSubmit } from "../imports";
import { getCurrencySymbol } from "../imports";
import { returnNumberAfterComa } from "../imports";
import { initialFormData } from "../utils/initialFormData";
import { calculateTotalCost } from "../imports";


interface FormProps {
    data: FormData;
    setData: React.Dispatch<React.SetStateAction<FormData>>;
    selectedCurrency: string;
    setNewCurrency: (newCurrency: string) => void;
    totalCost: number;
    setTotalCost: React.Dispatch<React.SetStateAction<number>>;
    setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setAllData: React.Dispatch<React.SetStateAction<FormData[]>>;
}

const Form: React.FC<FormProps> = ({
    data,
    setData,
    selectedCurrency,
    setNewCurrency,
    totalCost,
    setTotalCost,
    setSelectedCurrency,
    setLoading,
    setAllData,
}) => (
    <form onSubmit={(e) =>
        handleSubmit(
          e,
          data, 
          setData,
          totalCost,
          setTotalCost,
          selectedCurrency,
          initialFormData
        )}>
      <div className='container'>
          <input 
            type='number'
            name='discountPercentage'
            value={data.discountPercentage}
            className="input"
            min={0}
            max={100}
            onChange={(e) => handleChange(e, setData)}
          />
          <label className='label'>Discount Percentage:</label>
          <span className="error-message">Value cannot exceed 100%</span>
        </div>
        <div id="dateDiv">
          <label>Start Date and Time:</label>
          <input
            type='datetime-local'
            name='startDateTime'
            value={data.startDateTime}
            onChange={(e) => handleChange(e, setData)}
            id="dateInput"
            className="dateInput"
            required
            placeholder="Date:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MMYYYY"
          />
          <label>End Date and Time:</label>
          <input
            type='datetime-local'
            name='endDateTime'
            value={data.endDateTime}
            onChange={(e) => handleChange(e, setData)}
            required
            onBlur={() => calculateTotalCost(
              data,
              selectedCurrency,
              setTotalCost,
            )}
            id="dateInput"
            className="dateInput"
            placeholder="Date:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MMYYYY"
          />
        </div>
        <CurrencySelect
          selectedCurrency={selectedCurrency}
          handleCurrencyChange={setNewCurrency}

        />
        <h2 className='total-cost-h2'>Total Cost {getCurrencySymbol(selectedCurrency)}: {returnNumberAfterComa(totalCost, 2)}</h2>
        <button type='submit'>
          <span className="box">Confirm</span>
        </button>
        <button type='button' onClick={(e) =>
          handleGetData(
            e,
            setLoading,
            setAllData,
            setSelectedCurrency,
          )}>
          <span className="box">Reservation</span>
        </button>
        {data.id && (
          <button type='button' onClick={
            (e) => 
              handleUpdate(
                data,
                setNewCurrency,
                setAllData,
                setData,
                initialFormData,
                totalCost,
                selectedCurrency,
                setTotalCost,
          )}>
            <span className="box">Update</span>
          </button>
        )}
      </form>
);

export default Form;