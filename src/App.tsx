import React, { useEffect, useState } from 'react';
import { FormData } from './utils/FormData';
import { fields } from './utils/fields';
import { generateParkingCode } from './utils/generateParkingCode';
import { Currencys, getDefaultCurrency, getCurrencySymbol } from './utils/currencySymbol';
import { formatDateToString } from './utils/utils';
import CurrencySelect from './components/CurrencySelect';
import './style/App.css';
import './style/input-container.css';
import './style/dateInput.css';
import './style/dropdown.css';
import './style/tooltip-container.css';
import './style/button.css';


const App: React.FC = () => {
  const initialFormData: FormData = {
    firstName: "",
    lastName: "",
    phone: "",
    carModel: "",
    licensePlate: "",
    startDateTime: "",
    endDateTime: "",
    discountPercentage: "",
    currency: getDefaultCurrency(),
  };

  const [data, setData] = useState<FormData>(initialFormData);
  const [allData, setAllData] = useState<FormData[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(getDefaultCurrency());
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setData((prev) => ({ 
      ...prev, 
      [name]: name === "discountPercentage" ? (value ? parseFloat(value).toString() : "0") : value,
    }));
  };

  useEffect(() => {
    calculateTotalCost();
  }, [data.discountPercentage, data.startDateTime, data.endDateTime, selectedCurrency]);

  const calculateTotalCost = async () => {
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers:  {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDateTime: data.startDateTime,
          endDateTime: data.endDateTime,
          discountPercentage: data.discountPercentage,
          currency: selectedCurrency,
          paymentDate: new Date().toISOString().split("T")[0],
        }),
      });

      if(response.ok) {
        const { totalCost: costInSelecteedCurrency } = await response.json();
        setTotalCost(costInSelecteedCurrency);
      } else {
        console.error("Error calculating total cost.");
      }
    } catch(error) {
      console.error("Error:", error);
    }
  };

  const setNewCurrency = ( newCurrency : string ) => {
    setSelectedCurrency(newCurrency);
    setData(prev => ({ ...prev, currency: newCurrency }));
    calculateTotalCost();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await calculateTotalCost();
    const parkingCode = generateParkingCode();
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          parkingArea: parkingCode,
          totalCost,
          currency: selectedCurrency,
        }),
      });
      if (response.ok) {
        setData(initialFormData);
        setTotalCost(0);
      } else {
        console.error("Error saving data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGetData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch("/api/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setAllData(data);
            setSelectedCurrency(data[0].currency);
        } else {
            console.error("Error retrieving data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };

  const handleEdit = (index: number) => {
    const itemToEdit = allData[index];
    if (itemToEdit) {
      setNewCurrency(itemToEdit.currency ?? "");
      setData(itemToEdit);
      calculateTotalCost();
    }
  };

  const handleUpdate = async () => {
    await calculateTotalCost();

    try {
        const response = await fetch(`/api/data/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                parkingArea: data.parkingArea,
                totalCost,
                currency: setNewCurrency,
            }),
        });

        if (response.ok) {            
            setAllData((prevData) =>
                prevData.map((item) =>
                    item.id === data.id ? {...item, ...data, totalCost } : item
                )
            );
            setData(initialFormData);
        } else {
            console.error("Error updating data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };

  const handleDelete = async (index: number) => {
    const itemToDelete = allData[index];

    try {
      const response = await fetch(`/api/data/${itemToDelete.id}`, {
          method: "DELETE",
      });
      if (response.ok) {
          setAllData((prevData) => prevData.filter((_, i) => i !== index));
      } else {
          console.error("Error deleting data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='main-container'>
      <div className='left-container'>
          {fields.map((field) => (
            <div 
              key={field.name}
              className='container'
            >
              <input
              type='text'
              id={field.name}
              name={field.name}
              value={data[field.name as keyof FormData]}
              onChange={handleChange}
              className="input"
              required
              />
              <label 
                htmlFor={field.name}
                className='label'
              >
                {field.label}
              </label>
            </div>
          ))}
        <form onSubmit={handleSubmit}>
        <div className='container'>
            <input 
              type='number'
              name='discountPercentage'
              value={data.discountPercentage}
              className="input"
              min={0}
              max={100}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
              onBlur={calculateTotalCost}
              id="dateInput"
              className="dateInput"
              placeholder="Date:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MMYYYY"
            />
          </div>
          <CurrencySelect
            selectedCurrency={selectedCurrency}
            handleCurrencyChange={setNewCurrency}

          />
          <h2>Total Cost {getCurrencySymbol(selectedCurrency)}: {totalCost.toFixed(2)}</h2>
          <button type='submit'>
            <span className="box">Confirm</span>
          </button>
          <button type='button' onClick={handleGetData}>
            <span className="box">Reservation</span>
          </button>
          {data.id && (
            <button type='button' onClick={handleUpdate}>
              <span className="box">Update</span>
            </button>
          )}
        </form>
      </div>
      <div className='right-container'>
        <ul className='list'>
          {allData.map((item, index) => (
            <li key={item.id}>
              <strong>Name:</strong> <span>{item.firstName} {item.lastName}</span><br />
              <strong>Phone:</strong> <span>{item.phone}</span><br />
              <strong>Car Model:</strong> <span>{item.carModel}</span><br />
              <strong>License Plate:</strong> <span>{item.licensePlate}</span><br />
              <strong>Parking Area:</strong> <span>{item.parkingArea}</span><br />
              <strong>Total Cost:</strong> <span>{getCurrencySymbol(item.currency)} {item.totalCost?.toFixed(2)}</span><br />
              <strong>Start Date and Time:</strong> <span>{formatDateToString(item.startDateTime, " from ")}</span><br />
              <strong>End Date and Time:</strong> <span>{formatDateToString(item.endDateTime," to ")}</span><br />
              <button type='button' onClick={() => handleEdit(index)}>
                <span className="box">Edit</span>
              </button>
              <button type='button' onClick={() => handleDelete(index)}>
                <span className="box">Delete</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
