import React from "react";

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Pesquisar...",
}: SearchInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full
        max-w-md
        rounded-md
        border
        border-slate-300
        px-4
        py-2
        text-slate-700
        focus:outline-none
        focus:ring-2
        focus:ring-amber-400
      "
    />
  );
};

export default SearchInput;
