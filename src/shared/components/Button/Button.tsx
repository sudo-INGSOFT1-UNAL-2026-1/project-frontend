import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "./types";
import "./Button.css";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    startIcon,
    endIcon,
    className = "",
    disabled,
    type = "button",
    ...props
    }: ButtonProps) {
    const classes = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        fullWidth && "button--full",
        loading && "button--loading",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
        type={type}
        className={classes}
        disabled={disabled || loading}
        {...props}
        >
        {!loading && startIcon && (
            <span className="button__icon">
            {startIcon}
            </span>
        )}

        {loading ? (
            <>
            <span className="button__spinner" />
            <span>{children}</span>
            </>
        ) : (
            <span>{children}</span>
        )}

        {!loading && endIcon && (
            <span className="button__icon">
            {endIcon}
            </span>
        )}
        </button>
    );
}