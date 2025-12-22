import React from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  error?: string;
}

const TextInput = ({ labelName, error, ...props }: IInput) => {
  console.log(error);
  return (
    <div>
      <label htmlFor={labelName} className="font-semibold">
        {labelName}
        <input
          id={labelName}
          className={`w-full grid gap-1 rounded-md border-2 p-2 focus:outline-none 
      ${
        error
          ? "border-red-500 focus:ring-2 focus:ring-red-300"
          : "border-amber-100 focus:ring-2 focus:ring-amber-300"
      }`}
          {...props}
        />
      </label>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default TextInput;
