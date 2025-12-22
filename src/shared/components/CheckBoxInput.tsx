import React from "react";

interface CheckboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  labelName: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxInput = ({
  labelName,
  checked,
  onChange,
}: CheckboxInputProps) => {
  return (
    <label className="font-semibold gap-2 flex">
      <span className="font-semibold">{labelName}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};

export default CheckboxInput;
