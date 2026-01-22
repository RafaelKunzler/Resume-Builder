import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateInput(value) {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '');

  // Limit to 6 digits (MMYYYY)
  const limitedValue = numericValue.slice(0, 6);

  // Format as MM/YYYY
  if (limitedValue.length >= 3) {
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`;
  } else if (limitedValue.length >= 1) {
    return limitedValue;
  }

  return limitedValue;
}

export function handleDateInputChange(event, setValue, fieldName) {
  const input = event.target;
  const formattedValue = formatDateInput(input.value);

  // Update the input value
  input.value = formattedValue;

  // Update the form value
  setValue(fieldName, formattedValue, {
    shouldValidate: true,
    shouldDirty: true,
  });
}
