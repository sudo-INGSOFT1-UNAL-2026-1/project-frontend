import { useId } from 'react';
import { useMemo } from 'react';
import type { TextareaHTMLAttributes, ReactNode } from 'react';
import "./Textarea.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    showCount?: boolean;
}

export default function Textarea({
    label,
    error,
    helperText,
    fullWidth = false,
    startIcon,
    endIcon,
    showCount = false,
    className = '',
    id,
    required,
    value,
    maxLength,
    ...props
}: TextareaProps) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const characterCount = useMemo(() => String(value ?? '').length, [value]);

    const containerClasses = [
        "textarea",
        fullWidth && 'textarea--full',
        error && 'textarea--error',
        className,
    ]
    .filter(Boolean)
    .join(' ');

    const fieldClasses = [
        "textarea__field",
        startIcon && 'textarea__field--start-icon',
        endIcon && 'textarea__field--end-icon',
    ]
    .filter(Boolean)
    .join(' ');

    return (
        <div className={containerClasses}>
            {label && (<label htmlFor={textareaId} className="textarea__label">
                {label}
                {required && (<span className="textarea__required">*</span>)}
            </label>)}

            <div className="textarea__container">
                {startIcon && (<span className="textarea__icon textarea__icon--start">{startIcon}</span>)}
                <textarea
                    id={textareaId}
                    className={fieldClasses}
                    required={required}
                    value={value}
                    maxLength={maxLength}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : helperText ? helperId : undefined}
                    {...props}
                />
                {endIcon && (<span className="textarea__icon textarea__icon--end">{endIcon}</span>)}
            </div>
            <div className="textarea__footer">
                <div>
                    {error ? (
                        <span id={errorId} className="textarea__error">{error}</span>
                    ) : (helperText && (
                        <span id={helperId} className="textarea__helper">{helperText}</span>
                    ))}
                </div>

                {showCount && maxLength && (
                    <span className="textarea__count">{characterCount}/{maxLength}</span>
                )}
            </div>
        </div>
    );
}