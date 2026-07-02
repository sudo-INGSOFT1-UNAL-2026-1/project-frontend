import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import type { SelectOption } from "./types";
import "./Select.css";

interface SelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    label?: string;
    helperText?: string;
    error?: string;
    fullWidth?: boolean;
    placeholder?: string;
    options: SelectOption[];
}

export default function Select({
    label,
    helperText,
    error,
    fullWidth = false,
    placeholder = "Seleccione una opción",
    options,
    className = "",
    id,
    required,
    disabled,
    ...props
}: SelectProps) {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const classes = [
        "select",
        fullWidth && "select--full",
        error && "select--error",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
        {label && (
            <label htmlFor={selectId} className="select__label">
            {label}

            {required && (
                <span className="select__required">
                {" "}*
                </span>
            )}
            </label>
        )}

        <div className="select__container">
            <select
            id={selectId}
            className="select__field"
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
                error
                ? errorId
                : helperText
                ? helperId
                : undefined
            }
            {...props}
            >
            <option value="" disabled hidden>
                {placeholder}
            </option>

            {options.length === 0 ? (
                <option disabled>
                Sin opciones disponibles
                </option>
            ) : (
                options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label}
                </option>
                ))
            )}
            </select>
        </div>

        {error ? (
            <span
            id={errorId}
            className="select__error"
            >
            {error}
            </span>
        ) : (
            helperText && (
            <span
                id={helperId}
                className="select__helper"
            >
                {helperText}
            </span>
            )
        )}
        </div>
    );
}