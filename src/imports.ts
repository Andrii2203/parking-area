import { fields } from './utils/fields';
import { getDefaultCurrency, getCurrencySymbol } from './utils/currencySymbol';
import { formatDateToString, returnNumberAfterComa } from './utils/utils';
import { default as CurrencySelect } from './components/CurrencySelect';
import { default as ParkingRatesModal } from './components/ParkingRatesModal';
import { default as CustomToastContainer } from './components/CustomToastContainer';
import { default as DataList } from './components/DataList';
import { default as Form } from './components/Form';
import { default as InputFields } from './components/InputFields';
import { ToastContainer } from 'react-toastify';
import { default as handleEdit } from './handle/handleEdit'
import { default as handleSubmit } from './handle/handleSubmit';
import { default as handleGetData } from './handle/handleGetData';
import { default as handleUpdate } from './handle/handleUpdate';
import { default as handleDelete } from './handle/handleDelete';
import { default as handleChange } from './handle/handleChange';
import { default as calculateTotalCost } from './components/CalculateTotalCost';
import { initialFormData } from './utils/initialFormData';
import type { FormData } from './utils/formData';

import './style/App.css';
import './style/input-container.css';
import './style/dateInput.css';
import './style/dropdown.css';
import './style/tooltip-container.css';
import './style/button.css';
import 'react-toastify/dist/ReactToastify.css'


export {
    fields,
    getDefaultCurrency,
    getCurrencySymbol,
    formatDateToString,
    returnNumberAfterComa,
    CustomToastContainer,
    DataList,
    Form,
    InputFields,
    handleChange,
    initialFormData,
    FormData,
    CurrencySelect,
    ParkingRatesModal,
    ToastContainer,
    handleEdit,
    handleSubmit,
    handleGetData,
    handleUpdate,
    handleDelete,
    calculateTotalCost,
}