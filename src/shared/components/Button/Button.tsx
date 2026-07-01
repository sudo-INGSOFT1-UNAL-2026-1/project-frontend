import type { ButtonHTMLAttributes, ReactNode } from 'react';
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    className = '',
    ...props
}: ButtonProps) {
    const classes = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        fullWidth && 'button--full',
        loading && 'button--loading',
        className
    ]
    .filter(Boolean)
    .join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="button__spinner"></span>}

            <span className="button__content">{children}</span>

        </button>
    );
}