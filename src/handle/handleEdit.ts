import React from "react";
import calculateTotalCost from "../components/CalculateTotalCost";

const handleEdit = (
  index: number, 
  allData: any[], 
  setNewCurrency: (currency: string) => void, 
  setData: React.Dispatch<React.SetStateAction<any>>, 
  data: any,
  selectedCurrency: string,
  setTotalCost: React.Dispatch<React.SetStateAction<number>>,
) => {
    const itemToEdit = allData[index];
    if (itemToEdit) {
      setNewCurrency(itemToEdit.currency ?? "");
      setData(itemToEdit);
      calculateTotalCost(data, selectedCurrency, setTotalCost);
    }
  };
export default handleEdit;