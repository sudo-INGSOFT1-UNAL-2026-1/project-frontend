import { useEffect, useId, useRef,} from "react";
import type { InputHTMLAttributes } from "react";
import "./Checkbox.css";

interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    helperText?: string;
    error?: string;
    indeterminate?: boolean;
}

export default function Checkbox({
    label,
    helperText,
    error,
    indeterminate = false,
    className = "",
    id,
    required,
    disabled,
    ...props
}: CheckboxProps) {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;

    const classes = [
        "checkbox",
        error && "checkbox--error",
        disabled && "checkbox--disabled",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
        <label
            htmlFor={checkboxId}
            className="checkbox__label"
        >
            <input
                ref={inputRef}
                id={checkboxId}
                type="checkbox"
                className="checkbox__input"
                required={required}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={
                    error ? errorId : helperText ? helperId : undefined
                }
                {...props}
                />

            <span className="checkbox__box" />

            {label && (
            <span className="checkbox__text">
                {label}

                {required && (
                <span className="checkbox__required">
                    {" "}*
                </span>
                )}
            </span>
            )}
        </label>

        {error ? (
            <span
            id={errorId}
            className="checkbox__error"
            >
            {error}
            </span>
        ) : (
            helperText && (
            <span
                id={helperId}
                className="checkbox__helper"
            >
                {helperText}
            </span>
            )
        )}
        </div>
    );
}