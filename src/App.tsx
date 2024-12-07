import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  getDefaultCurrency,
  CustomToastContainer,
  DataList,
  Form,
  InputFields,
  handleChange,
  initialFormData,
  FormData,
  ParkingRatesModal,
  calculateTotalCost,
}  from './imports';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [data, setData] = useState<FormData>(initialFormData);
  const [allData, setAllData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [totalCost, setTotalCost] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(getDefaultCurrency());  
  
  useEffect(() => {
    calculateTotalCost(data, selectedCurrency, setTotalCost);
  }, [data.discountPercentage, data.startDateTime, data.endDateTime, selectedCurrency]);
  
  const setNewCurrency = ( newCurrency : string ) => {
    setSelectedCurrency(newCurrency);
    setData((prev) => ({ ...prev, currency: newCurrency }));
    calculateTotalCost(data, selectedCurrency, setTotalCost);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className='main-container'>
        <CustomToastContainer />
        <ParkingRatesModal />
        <Form 
          data={data}
          setData={setData}
          selectedCurrency={selectedCurrency || getDefaultCurrency()}
          setNewCurrency={setNewCurrency}
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          setSelectedCurrency={setSelectedCurrency}
          setLoading={setLoading}
          setAllData={setAllData}
        />
        <InputFields 
          data={data}
          handleChange={(e) => handleChange(e, setData)}
        />
        <div className='right-container'>
          <DataList 
            allData={allData}
            loading={loading}
            setNewCurrency={setNewCurrency}
            setData={setData}
            data={data}
            selectedCurrency={selectedCurrency || getDefaultCurrency()}
            setTotalCost={setTotalCost}
            setAllData={setAllData}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
