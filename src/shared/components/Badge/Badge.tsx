import type { HTMLAttributes, ReactNode } from "react";
import type { BadgeSize, BadgeVariant } from "./types";
import "./Badge.css";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: boolean;
}

export default function Badge({
    children,
    variant = "primary",
    size = "md",
    rounded = true,
    className = "",
    ...props
    }: BadgeProps) {
    const classes = [
        "badge",
        `badge--${variant}`,
        `badge--${size}`,
        rounded && "badge--rounded",
        className,
        ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes} {...props}>
        {children}
        </span>
    );
}