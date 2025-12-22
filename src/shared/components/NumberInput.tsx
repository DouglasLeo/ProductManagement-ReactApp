import React from "react";

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  labelName?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const normalizeNumber = (value: string) => {
  return value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
};

const NumberInput = ({
  labelName,
  value,
  onChange,
  error,
  ...props
}: NumberInputProps) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const normalized = normalizeNumber(event.target.value);
    onChange(normalized);
  }

  return (
    <label>
      <span className="font-semibold">{labelName}</span>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        className={`w-full grid gap-1 rounded-md border-2 p-2 focus:outline-none 
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-amber-100 focus:ring-2 focus:ring-amber-300"
            }`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
};

export default NumberInput;
