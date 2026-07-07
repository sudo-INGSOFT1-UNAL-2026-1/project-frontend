import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ChipSize, ChipVariant } from "./types";
import "./Chip.css";

interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    children: ReactNode;
    variant?: ChipVariant;
    size?: ChipSize;
    selected?: boolean;
    removable?: boolean;
    onRemove?: () => void;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

export default function Chip({
    children,
    variant = "secondary",
    size = "md",
    selected = false,
    removable = false,
    onRemove,
    startIcon,
    endIcon,
    className = "",
    disabled,
    ...props
    }: ChipProps) {
    const classes = [
        "chip",
        `chip--${variant}`,
        `chip--${size}`,
        selected && "chip--selected",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
        type="button"
        className={classes}
        disabled={disabled}
        {...props}
        >
        {startIcon && (
            <span className="chip__icon">
            {startIcon}
            </span>
        )}

        <span className="chip__label">
            {children}
        </span>

        {endIcon && !removable && (
            <span className="chip__icon">
            {endIcon}
            </span>
        )}

        {removable && (
            <span
            className="chip__remove"
            onClick={(event) => {
                event.stopPropagation();
                onRemove?.();
            }}
            >
            ×
            </span>
        )}
        </button>
    );
}