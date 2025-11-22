/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

type FormType = {
  productName: string;
  brand: string;
  description: string;
  category: string;
  rating: number | string;
  images: string[];
  prices: { size: string; price: number | string }[];
};

type UpdateFormContextType = {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
};

export const UpdateFormContext = createContext<UpdateFormContextType | null>(
  null
);

// do the provider
export const UpdateFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [form, setForm] = useState<FormType>({
    productName: "",
    brand: "",
    description: "",
    category: "",
    rating: "",
    images: [],
    prices: [
      { size: "S", price: "" },
      { size: "M", price: "" },
      { size: "L", price: "" },
    ],
  });
  return (
    <UpdateFormContext.Provider value={{ form, setForm }}>
      {children}
    </UpdateFormContext.Provider>
  );
};


// useFormContext... 
// context => useContext(UpdateFormContext)
export const useFormUpdater = () => {
    const context = useContext(UpdateFormContext);
    if(!context) throw new Error("useFormUpdater must be used within UpdateFormProvider");
    return context;

}