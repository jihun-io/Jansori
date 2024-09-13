"use client";

import React, { createContext, useState, useContext } from "react";

const CheckboxContext = createContext();

export const CheckboxProvider = ({ children }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <CheckboxContext.Provider value={{ checkedItems, handleCheckboxChange }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckbox = () => useContext(CheckboxContext);
