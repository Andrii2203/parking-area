import React from 'react';
import { ToastContainer } from '../imports';

const CustomToastContainer: React.FC = () => (
  <ToastContainer theme='dark' position='bottom-right' newestOnTop={false} />
);

export default CustomToastContainer;
