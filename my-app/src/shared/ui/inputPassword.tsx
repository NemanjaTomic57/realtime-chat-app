"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";
import clsx from "clsx";

interface Props {
  inputName: string;
  label: string;
  placeholder?: string;
  background?: string;
  className?: string;
}

export default function InputPassword({ inputName, label = "Passwort", placeholder, background, className }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const ariaLabel = "Dein sicheres Passwort";
  const [placeholderState, setPlaceholderState] = useState(placeholder);

  const errorMessage = errors[inputName]?.message as string;

  return (
    <div className={className}>
      <label htmlFor={inputName} className="input-label">
        {label}
      </label>
      <input
        id={inputName}
        {...register(inputName)}
        type="password"
        placeholder={placeholderState}
        onFocus={() => setPlaceholderState("")}
        onBlur={() => setPlaceholderState(placeholder)}
        className={clsx("input", background)}
        aria-label={ariaLabel}
      />

      <InputValidationError>{errorMessage}</InputValidationError>
    </div>
  );
}
