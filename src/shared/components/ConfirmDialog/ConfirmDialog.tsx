import type { ReactNode } from "react";

import Button from "../Button";
import Modal from "../Modal";

import type { ButtonVariant } from "../Button/types";

import "./ConfirmDialog.css";

interface ConfirmDialogProps {
    open: boolean;

    title: ReactNode;

    message: ReactNode;

    variant?: ButtonVariant;

    confirmText?: string;

    cancelText?: string;

    loading?: boolean;

    onConfirm: () => void;

    onCancel: () => void;
    }

export default function ConfirmDialog({
    open,
    title,
    message,
    variant = "danger",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    loading = false,
    onConfirm,
    onCancel,
    }: ConfirmDialogProps) {
    return (
        <Modal
        open={open}
        onClose={onCancel}
        size="sm"
        title={title}
        footer={
            <>
            <Button
                variant="secondary"
                onClick={onCancel}
                disabled={loading}
            >
                {cancelText}
            </Button>

            <Button
                variant={variant}
                onClick={onConfirm}
                loading={loading}
            >
                {confirmText}
            </Button>
            </>
        }
        >
        <div className="confirm-dialog">
            <p className="confirm-dialog__message">
            {message}
            </p>
        </div>
        </Modal>
    );
    }