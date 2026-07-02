import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    subtitle?: ReactNode;
    actions?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    bordered?: boolean;
    hoverable?: boolean;
    fullWidth?: boolean;
}

export default function Card({
    title,
    subtitle,
    actions,
    footer,
    children,
    bordered = true,
    hoverable = false,
    fullWidth = false,
    className = "",
    ...props
    }: CardProps) {
    const classes = [
        "card",
        bordered && "card--bordered",
        hoverable && "card--hoverable",
        fullWidth && "card--full",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={classes} {...props}>
        {(title || subtitle || actions) && (
            <header className="card__header">
            <div className="card__titles">
                {title && (
                <h2 className="card__title">
                    {title}
                </h2>
                )}

                {subtitle && (
                <p className="card__subtitle">
                    {subtitle}
                </p>
                )}
            </div>

            {actions && (
                <div className="card__actions">
                {actions}
                </div>
            )}
            </header>
        )}

        <div className="card__body">
            {children}
        </div>

        {footer && (
            <footer className="card__footer">
            {footer}
            </footer>
        )}
        </section>
    );
}