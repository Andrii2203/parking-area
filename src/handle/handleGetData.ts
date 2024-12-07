import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const handleGetData = async (
    e: React.FormEvent,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setAllData: React.Dispatch<React.SetStateAction<any>>,
    setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>,
) => {
    e.preventDefault();
    try {
        setLoading(true);
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
            toast.error("Error retrieving data");
        }
    } catch (error) {
        toast.error("An unexpected error occurred while retrieving data.");
    } finally {
      setLoading(false);
    }
};

export default handleGetData;