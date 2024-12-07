import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiCall = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

const calculateTotalCost = async (
    data: any,
    selectedCurrency: string,
    setTotalCost: React.Dispatch<React.SetStateAction<number>>,
) => {
    if(new Date(data.endDateTime) <= new Date(data.startDateTime)) {
      toast.error("End date must be after the start date.")
      return;
    }
    try {
      const response = await apiCall("/api/calculate", {
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

      if(response.totalCost) {
        setTotalCost(response.totalCost);
      } else {
        toast.error("Error calculating total cost.");
      }
    } catch(error) {
      toast.error("An unexpected error occurred while calculating total cost.");
    }
};

export default calculateTotalCost;
