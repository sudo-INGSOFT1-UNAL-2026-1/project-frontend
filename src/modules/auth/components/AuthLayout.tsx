import type { ReactNode } from "react";

import Card from "../../../shared/components/Card";

import "./AuthLayout.css";

interface AuthLayoutProps {
    title: ReactNode;

    subtitle?: ReactNode;

    logo?: ReactNode;

    children: ReactNode;
}

export default function AuthLayout({
    title,
    subtitle,
    logo,
    children,
    }: AuthLayoutProps) {
    return (
        <div className="auth-layout">
        <Card className="auth-layout__card">
            <header className="auth-layout__header">
            {logo && (
                <div className="auth-layout__logo">
                {logo}
                </div>
            )}

            <h1 className="auth-layout__title">
                {title}
            </h1>

            {subtitle && (
                <p className="auth-layout__subtitle">
                {subtitle}
                </p>
            )}
            </header>

            <div className="auth-layout__content">
            {children}
            </div>
        </Card>
        </div>
    );
}