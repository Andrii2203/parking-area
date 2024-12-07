import React from 'react';
import { generateParkingCode } from '../utils/generateParkingCode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import calculateTotalCost from '../components/CalculateTotalCost';

const handleSubmit = async (
  e: React.FormEvent,
  data: any,
  setData: React.Dispatch<React.SetStateAction<any>>,
  totalCost: number,
  setTotalCost: React.Dispatch<React.SetStateAction<number>>,
  selectedCurrency: string,
  initialFormData: any,
) => {
    e.preventDefault();
    await calculateTotalCost(data, selectedCurrency, setTotalCost);
    const parkingCode = generateParkingCode();
    if(!data.firstName || !data.lastName || !data.startDateTime || !data.endDateTime) {
      toast.error("Please fill in all required field!")
      return;
    }
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
        toast.success("Data saved successfully.");
      } else {
        toast.error("Error saving data");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while saving data.");
    }
};
export default handleSubmit;