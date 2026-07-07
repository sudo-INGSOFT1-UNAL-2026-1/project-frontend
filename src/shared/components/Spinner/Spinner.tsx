import type { HTMLAttributes } from "react";
import type { SpinnerSize } from "./types";
import "./Spinner.css";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
    size?: SpinnerSize;
    label?: string;
    fullScreen?: boolean;
}

export default function Spinner({
    size = "md",
    label,
    fullScreen = false,
    className = "",
    ...props
    }: SpinnerProps) {
    const classes = [
        "spinner",
        `spinner--${size}`,
        fullScreen && "spinner--fullscreen",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
        className={classes}
        role="status"
        aria-live="polite"
        {...props}
        >
        <div className="spinner__circle" />

        {label && (
            <span className="spinner__label">
            {label}
            </span>
        )}

        <span className="spinner__sr-only">
            Cargando...
        </span>
        </div>
    );
}