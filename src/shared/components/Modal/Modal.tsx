import { useEffect, type HTMLAttributes, type ReactNode } from "react";

import type { ModalSize } from "./types";

import "./Modal.css";

interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    open: boolean;

    onClose: () => void;

    title?: ReactNode;

    footer?: ReactNode;

    children: ReactNode;

    size?: ModalSize;

    closeOnOverlay?: boolean;

    closeOnEscape?: boolean;

    showCloseButton?: boolean;
}

export default function Modal({
    open,
    onClose,
    title,
    footer,
    children,
    size = "md",
    closeOnOverlay = true,
    closeOnEscape = true,
    showCloseButton = true,
    className = "",
    ...props
    }: ModalProps) {
    useEffect(() => {
        if (!open) {
        return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && closeOnEscape) {
            onClose();
        }
        };

        document.addEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "hidden";

        return () => {
        document.removeEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "";
        };
    }, [open, closeOnEscape, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div
        className="modal__overlay"
        onClick={() => {
            if (closeOnOverlay) {
            onClose();
            }
        }}
        >
        <div
            className={[
            "modal",
            `modal--${size}`,
            className,
            ]
            .filter(Boolean)
            .join(" ")}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            {...props}
        >
            {(title || showCloseButton) && (
            <header className="modal__header">
                <div className="modal__title">
                {title}
                </div>

                {showCloseButton && (
                <button
                    type="button"
                    className="modal__close"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    ×
                </button>
                )}
            </header>
            )}

            <div className="modal__body">
            {children}
            </div>

            {footer && (
            <footer className="modal__footer">
                {footer}
            </footer>
            )}
        </div>
        </div>
    );
}