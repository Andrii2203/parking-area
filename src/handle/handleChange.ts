import { FormData } from "../utils/formData";

const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setData: React.Dispatch<React.SetStateAction<FormData>>
) => {
    const { name, value } = e.target;
    setData((prev) => ({ 
      ...prev, 
      [name]: name === "discountPercentage" ? (value ? parseFloat(value).toString() : "0") : value,
    }));
  };
  
export default handleChange;