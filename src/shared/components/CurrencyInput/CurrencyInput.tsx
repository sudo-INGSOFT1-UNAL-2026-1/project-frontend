import { useMemo } from "react";
import type { InputHTMLAttributes } from "react";

import "./CurrencyInput.css";

interface CurrencyInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "value" | "onChange" | "type"
    > {

    label?: string;

    helperText?: string;

    error?: string;

    fullWidth?: boolean;

    value: number;

    onValueChange: (
        value: number
    ) => void;

}

export default function CurrencyInput({

    label,

    helperText,

    error,

    fullWidth = false,

    value,

    onValueChange,

    className = "",

    ...props

}: CurrencyInputProps) {

    const formattedValue = useMemo(() =>

        new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }
        ).format(value),

        [value]

    );

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const digits =
            event.target.value.replace(/\D/g, "");

        onValueChange(
            digits === ""
                ? 0
                : Number(digits)
        );

    }

    return (

        <div
            className={[
                "currency-input",
                fullWidth &&
                    "currency-input--full",
                className,
            ]
                .filter(Boolean)
                .join(" ")
            }
        >

            {label && (
                <label className="currency-input__label">
                    {label}
                </label>
            )}

            <input
                type="text"
                value={formattedValue}
                onChange={handleChange}
                className={[
                    "currency-input__field",
                    error &&
                        "currency-input__field--error",
                ]
                    .filter(Boolean)
                    .join(" ")
                }
                {...props}
            />

            {error ? (

                <span className="currency-input__error">
                    {error}
                </span>

            ) : (

                helperText && (
                    <span className="currency-input__helper">
                        {helperText}
                    </span>
                )

            )}

        </div>

    );

}