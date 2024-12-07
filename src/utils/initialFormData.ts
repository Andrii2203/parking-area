import { FormData } from "./formData";
import { getDefaultCurrency } from "./currencySymbol";

export const initialFormData: FormData = {
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
