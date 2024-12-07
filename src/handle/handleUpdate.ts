import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FormData } from '../utils/formData';
import calculateTotalCost from '../components/CalculateTotalCost';

const handleUpdate = async (
    data: any,
    setNewCurrency: (currency: string) => void,
    setAllData: React.Dispatch<React.SetStateAction<any>>,
    setData: React.Dispatch<React.SetStateAction<any>>,
    initialFormData: any,
    totalCost: number,
    selectedCurrency: string,
    setTotalCost: React.Dispatch<React.SetStateAction<number>>,
) => {
    await calculateTotalCost(data, selectedCurrency, setTotalCost);

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
            setAllData((prevData: FormData[]) =>
                prevData.map((item: FormData) =>
                    item.id === data.id ? {...item, ...data, totalCost } : item
                )
            );
            setData(initialFormData);
            toast.success("Data updated successfully.");
        } else {
            toast.error("Error updating data");
        }
    } catch (error) {
        toast.error("An unexpected error occurred while updating data.");
    }
};
export default handleUpdate;