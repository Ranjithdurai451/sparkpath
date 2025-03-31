
import { defaultFormData } from '@/lib/mockData';
import { FormContextType, FormData } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';


const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  
  const resetForm = () => {
    setFormData(defaultFormData);
  };

  // Check if required fields are filled
  const isFormComplete = Boolean(
    formData.industry &&
    formData.budget &&
    formData.teamSize &&
    formData.problemStatement &&
    formData.targetCustomer &&
    formData.country // Making country a required field
  );

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm, isFormComplete }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
