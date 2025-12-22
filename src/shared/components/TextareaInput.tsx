import React from "react";

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelName: string;
  error?: string;
}

const Input = ({ labelName, error, ...props }: TextareaInputProps) => {
  return (
    <div>
      <label htmlFor={labelName} className="font-semibold">
        {labelName}
        <textarea
          id={labelName}
          className={`w-full grid gap-1 rounded-md border-2 p-2 focus:outline-none 
              ${
                error
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-amber-100 focus:ring-2 focus:ring-amber-300"
              }`}
          {...props}
        ></textarea>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </label>
    </div>
  );
};

export default Input;
