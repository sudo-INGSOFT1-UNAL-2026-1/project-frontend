import type {
    HTMLAttributes,
    ReactNode,
} from "react";

import type {
    AlertSize,
    AlertVariant,
} from "./types";

import "./Alert.css";

interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    variant?: AlertVariant;

    size?: AlertSize;

    title?: ReactNode;

    children: ReactNode;

    icon?: ReactNode;

    closable?: boolean;

    onClose?: () => void;
}

export default function Alert({
    variant = "info",
    size = "md",
    title,
    children,
    icon,
    closable = false,
    onClose,
    className = "",
    ...props
    }: AlertProps) {
    const classes = [
        "alert",
        `alert--${variant}`,
        `alert--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
        className={classes}
        role="alert"
        {...props}
        >
        {icon && (
            <div className="alert__icon">
            {icon}
            </div>
        )}

        <div className="alert__content">
            {title && (
            <h4 className="alert__title">
                {title}
            </h4>
            )}

            <div className="alert__message">
            {children}
            </div>
        </div>

        {closable && (
            <button
            type="button"
            className="alert__close"
            onClick={onClose}
            aria-label="Cerrar alerta"
            >
            ×
            </button>
        )}
        </div>
    );
}