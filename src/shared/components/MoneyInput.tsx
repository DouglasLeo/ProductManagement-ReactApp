import React from "react";

interface MoneyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  labelName: string;
  name: string;
  value?: number;
  onChange: (value: number) => void;
  labelClassName?: string;
  error?: string;
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function MoneyInput({
  labelName,
  name,
  value = 0,
  onChange,
  error,
  ...props
}: MoneyInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/\D/g, "").replace(/^0+/, "");
    const numericValue = Number(rawValue) / 100;
    onChange(numericValue);
  }

  return (
    <label>
      <span className="font-semibold">{labelName}</span>
      <input
        type="text"
        name={name}
        value={formatCurrency(value)}
        onChange={handleChange}
        inputMode="numeric"
        className={`w-full rounded-md border-2 p-2 focus:outline-none 
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
}
