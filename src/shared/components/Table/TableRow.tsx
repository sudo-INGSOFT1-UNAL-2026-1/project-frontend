import type { TableColumn } from "./types";

interface TableRowProps<T> {
    row: T;

    index: number;

    columns: TableColumn<T>[];

    selectable?: boolean;

    selected?: boolean;

    hoverable?: boolean;

    striped?: boolean;

    onSelect?: (
        checked: boolean,
        row: T
    ) => void;

    onClick?: (
        row: T
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
    onSelect,
    onClick,
    }: TableRowProps<T>) {
    const classes = [
        "table__row",
        hoverable && "table__row--hover",
        striped && index % 2 !== 0 && "table__row--striped",
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
            <td className="table__cell table__cell--checkbox">
            <input
                type="checkbox"
                checked={selected}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) =>
                onSelect?.(event.target.checked, row)
                }
            />
            </td>
        )}

        {columns.map((column) => {
            const value = row[column.key as keyof T];

            return (
            <td
                key={String(column.key)}
                className={[
                "table__cell",
                column.align &&
                    `table__cell--${column.align}`,
                ]
                .filter(Boolean)
                .join(" ")}
                style={{
                width: column.width,
                }}
            >
                {column.render
                ? column.render(row, index)
                : value !== null &&
                    value !== undefined &&
                    value !== ""
                    ? String(value)
                    : "-"}
            </td>
            );
        })}
        </tr>
    );
}