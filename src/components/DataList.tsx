import React from "react";
import handleDelete from "../handle/handleDelete"
import handleEdit from "../handle/handleEdit"
import { FormData } from "../utils/formData";
import { getCurrencySymbol, returnNumberAfterComa, formatDateToString } from "../imports";


interface DataListProps {
    allData: FormData[];
    loading: boolean;
    setNewCurrency: (newCurrency: string) => void;
    setData: React.Dispatch<React.SetStateAction<FormData>>;
    data: FormData;
    selectedCurrency: string;
    setTotalCost: React.Dispatch<React.SetStateAction<number>>;
    setAllData: React.Dispatch<React.SetStateAction<FormData[]>>;
}
const DataList: React.FC<DataListProps> = ({
    allData,
    loading,
    setNewCurrency,
    setData,
    data,
    selectedCurrency,
    setTotalCost,
    setAllData,
}) => {
    return (
        <div>
            {loading ? (
          <div className='loading-spinner-box'>
            <span className='loading-spinner-span'>Loading...</span>
          </div>
        ) : (
          <ul className='list'>
            {allData.map((item, index) => (
              <li key={item.id}>
                <strong>Name:</strong> <span>{item.firstName} {item.lastName}</span><br />
                <strong>Phonefbdd:</strong> <span>{item.phone}</span><br />
                <strong>Car Model:</strong> <span>{item.carModel}</span><br />
                <strong>License Plate:</strong> <span>{item.licensePlate}</span><br />
                <strong>Parking Area:</strong> <span>{item.parkingArea}</span><br />
                <strong>Total Cost:</strong> <span>{getCurrencySymbol(item.currency)} {item.totalCost !== undefined ? returnNumberAfterComa(item.totalCost, 2) : "N/A"}</span><br />
                <strong>Start Date and Time:</strong> <span>{formatDateToString(item.startDateTime, " from ")}</span><br />
                <strong>End Date and Time:</strong> <span>{formatDateToString(item.endDateTime," to ")}</span><br />
                <button 
                  type='button' 
                  onClick={() => handleEdit(
                    index,
                    allData,
                    setNewCurrency,
                    setData,
                    data,
                    selectedCurrency,
                    setTotalCost
                )}>
                  <span className="box">Edit</span>
                </button>
                <button type='button' onClick={() => handleDelete(
                  index,
                  allData,
                  setAllData,
                )}>
                  <span className="box">Delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        </div>
    )
}

export default DataList;