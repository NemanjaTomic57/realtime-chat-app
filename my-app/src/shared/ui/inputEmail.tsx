"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";
import clsx from "clsx";
import IconTooltip from "./iconTooltip";

interface Props {
  inputName: string;
  label: string;
  placeholder?: string;
  ariaLabel?: string;
  background?: string;
  questionTooltip?: boolean;
  className?: string;
}

export default function InputEmail({
  inputName,
  label,
  placeholder,
  ariaLabel,
  background,
  questionTooltip,
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
        <div className="flex justify-between items-center">
          {label}
          {questionTooltip && (
            <IconTooltip iconName="question">
              When you receive a new notification, we will send you an email. You can disable this feature in the
              settings.
            </IconTooltip>
          )}
        </div>
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
