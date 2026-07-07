import Checkbox from "../Checkbox";
import type { ReactNode } from "react";

import type { TableColumn } from "./types";

interface TableRowProps<T> {

    row: T;

    index: number;

    columns: TableColumn<T>[];

    selectable?: boolean;

    selected?: boolean;

    hoverable?: boolean;

    striped?: boolean;

    onClick?: (
        row: T
    ) => void;

    onSelect?: (
        checked: boolean
    ) => void;
}

export default function TableRow<T>({
    row,
    index,
    columns,
    selectable = false,
    selected = false,
    hoverable = true,
    striped = false,
    onClick,
    onSelect,
}: TableRowProps<T>) {

    const classes = [
        hoverable && "table__row--hoverable",
        striped &&
            index % 2 === 1 &&
            "table__row--striped",
        selected && "table__row--selected",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <tr
            className={classes}
            onClick={() => onClick?.(row)}
        >
            {selectable && (
                <td className="table__checkbox">
                    <Checkbox
                        checked={selected}
                        onChange={(event) =>
                            onSelect?.(
                                event.target.checked
                            )
                        }
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    />
                </td>
            )}

            {columns.map((column) => {

                const content: ReactNode =
                    column.render?.(
                        row,
                        index
                    ) ??
                    row[
                        column.key as keyof T
                    ] as ReactNode;

                return (
                    <td
                        key={String(column.key)}
                        className={
                            column.align
                                ? `table__cell table__cell--${column.align}`
                                : "table__cell"
                        }
                        style={{
                            width: column.width,
                        }}
                    >
                        {content}
                    </td>
                );
            })}
        </tr>
    );
}