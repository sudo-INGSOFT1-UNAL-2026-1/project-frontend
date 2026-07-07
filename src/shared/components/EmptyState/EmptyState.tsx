import type { HTMLAttributes, ReactNode } from "react";

import type { EmptyStateSize } from "./types";

import "./EmptyState.css";

interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title: ReactNode;

    description?: ReactNode;

    illustration?: ReactNode;

    action?: ReactNode;

    size?: EmptyStateSize;
}

export default function EmptyState({
    title,
    description,
    illustration,
    action,
    size = "md",
    className = "",
    ...props
    }: EmptyStateProps) {
    const classes = [
        "empty-state",
        `empty-state--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
        className={classes}
        {...props}
        >
        {illustration && (
            <div className="empty-state__illustration">
            {illustration}
            </div>
        )}

        <h2 className="empty-state__title">
            {title}
        </h2>

        {description && (
            <p className="empty-state__description">
            {description}
            </p>
        )}

        {action && (
            <div className="empty-state__action">
            {action}
            </div>
        )}
        </div>
    );
}