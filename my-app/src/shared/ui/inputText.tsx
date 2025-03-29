"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";
import clsx from "clsx";

interface Props {
  inputName: string;
  label: string;
  placeholder?: string;
  ariaLabel?: string;
  background?: string;
  className?: string;
}

export default function InputText({
  inputName,
  label,
  placeholder,
  ariaLabel,
  background,
  className,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [placeholderState, setPlaceholderState] = useState(placeholder);

  const errorMessage = errors[inputName]?.message as string;

  return (
    <div className={className}>
      <label htmlFor={inputName} className="input-label">
        {label}
      </label>
      <input
        id={inputName}
        type="text"
        placeholder={placeholderState}
        {...register(inputName)}
        onFocus={() => setPlaceholderState("")}
        onBlur={() => setPlaceholderState(placeholder)}
        className={clsx("input", background)}
        aria-label={ariaLabel}
      />

      <InputValidationError>{errorMessage}</InputValidationError>
    </div>
  );
}
