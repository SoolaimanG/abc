import React, { ChangeEvent } from "react";

type inputProps<T> = {
  value: T;
  includeBorder: boolean;
  placeholder: string;
  disabled: boolean;
  error?: boolean;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  type: "text" | "password" | "textarea" | "number" | "email";
};

function Input<T>(props: inputProps<T>) {
  const { value, includeBorder, placeholder, type, disabled, setValue } = props;

  // Handling the changing input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as React.SetStateAction<T>);
  };

  return (
    <input
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full text-[#252525] ${
        includeBorder && "border-solid border-[1.3px] border-blue-400"
      } h-[2.5rem] rounded-md pl-1 outline-none`}
      value={value as string}
      onChange={(e) => handleChange(e)}
      type={type}
    />
  );
}

export default Input;
