import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

export default function Input({
    label,
    error,
    fullWidth = false,
    className = '',
    id,
    startIcon,
    endIcon,
    required,
    helperText,
    ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const containerClasses = [
        "input",
        fullWidth && 'input--full',
        error && 'input--error',
        className,
    ]
    .filter(Boolean)
    .join(' ');

    const fieldClasses = [
        "input__field",
        startIcon && 'input__field--start-icon',
        endIcon && 'input__field--end-icon',
    ]
    .filter(Boolean)
    .join(' ');
    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={inputId} className="input__label">
                    {label}
                    {required && (<span className="input__required">{" "}*</span>)}
                </label>
            )}

            <div className="input__container">
                {startIcon && (<span className="input__icon input__icon--start">{startIcon}</span>)}
                <input 
                    id={inputId}
                    className={fieldClasses}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : helperText ? helperId : undefined}
                    {...props}
                />

                {endIcon && (<span className="input__icon input__icon--end">{endIcon}</span>)}
            </div>
            {error ? (
                <span id={errorId} className="input__error">
                    {error}
                </span>
            ) : (
                helperText && (
                <span id={helperId} className="input__helper">
                    {helperText}
                </span>
            ))}
        </div>
    );
}