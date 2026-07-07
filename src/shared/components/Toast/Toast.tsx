import { useEffect } from "react";
import {
    CheckCircle2,
    CircleAlert,
    CircleX,
    Info,
    X,
} from "lucide-react";

import type { ToastVariant } from "./types";

import "./Toast.css";

interface ToastProps {

    open: boolean;

    message: string;

    variant?: ToastVariant;

    duration?: number;

    onClose: () => void;

}

export default function Toast({
    open,
    message,
    variant = "info",
    duration = 3000,
    onClose,
}: ToastProps) {

    useEffect(() => {

        if (!open) {
            return;
        }

        const timer = setTimeout(
            onClose,
            duration
        );

        return () => clearTimeout(timer);

    }, [
        open,
        duration,
        onClose,
    ]);

    if (!open) {
        return null;
    }

    const icons = {
        success: <CheckCircle2 size={20} />,
        danger: <CircleX size={20} />,
        warning: <CircleAlert size={20} />,
        info: <Info size={20} />,
    };

    return (
        <div
            className={[
                "toast",
                `toast--${variant}`,
            ].join(" ")}
        >

            <div className="toast__icon">
                {icons[variant]}
            </div>

            <span className="toast__message">
                {message}
            </span>

            <button
                type="button"
                className="toast__close"
                onClick={onClose}
            >
                <X size={18} />
            </button>

        </div>
    );

}