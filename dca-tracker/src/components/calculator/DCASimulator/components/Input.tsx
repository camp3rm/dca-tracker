import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  registration: UseFormRegisterReturn;
}

export const Input: React.FC<InputProps> = ({ registration, ...rest }) => {
  return <input {...registration} {...rest} />;
};
