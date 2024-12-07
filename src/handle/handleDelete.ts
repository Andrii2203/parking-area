import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormData } from '../utils/formData';

const handleDelete = async (
    index: number,
    allData: any,
    setAllData: React.Dispatch<React.SetStateAction<any>>,
) => {
    const itemToDelete = allData[index];

    try {
      const response = await fetch(`/api/data/${itemToDelete.id}`, {
          method: "DELETE",
      });
      if (response.ok) {
          setAllData((prevData: FormData[]) => prevData.filter((_, i) => i !== index));
          toast.success("Data deleted successfully.");
        } else {
          toast.error("Error deleting data");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while deleting data.");
    }
};

export default handleDelete;