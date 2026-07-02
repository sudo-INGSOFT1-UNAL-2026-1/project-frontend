import type { TableColumn } from "./types";

interface TableHeaderProps<T> {
    columns: TableColumn<T>[];

    selectable?: boolean;

    stickyHeader?: boolean;

    selectedCount?: number;

    totalRows?: number;

    onSelectAll?: (checked: boolean) => void;

    sortColumn?: string;

    sortDirection?: "asc" | "desc";

    onSort?: (column: string) => void;
}

export default function TableHeader<T>({
    columns,
    selectable = false,
    stickyHeader = false,
    selectedCount = 0,
    totalRows = 0,
    onSelectAll,
    sortColumn,
    sortDirection,
    onSort,
    }: TableHeaderProps<T>) {
    return (
        <thead
        className={[
            "table__head",
            stickyHeader && "table__head--sticky",
        ]
            .filter(Boolean)
            .join(" ")}
        >
        <tr>
            {selectable && (
            <th className="table__cell table__cell--checkbox">
                <input
                type="checkbox"
                checked={
                    totalRows > 0 &&
                    selectedCount === totalRows
                }
                onChange={(event) =>
                    onSelectAll?.(event.target.checked)
                }
                />
            </th>
            )}

            {columns.map((column) => (
            <th
                key={String(column.key)}
                className={[
                "table__cell",
                "table__cell--head",
                column.align &&
                    `table__cell--${column.align}`,
                column.sortable &&
                    "table__cell--sortable",
                ]
                .filter(Boolean)
                .join(" ")}
                style={{
                width: column.width,
                }}
                onClick={() => {
                if (column.sortable) {
                    onSort?.(String(column.key));
                }
                }}
            >
                <span className="table__header-content">
                {column.title}

                {column.sortable &&
                    sortColumn === column.key && (
                    <span className="table__sort">
                        {sortDirection === "asc"
                        ? "▲"
                        : "▼"}
                    </span>
                    )}
                </span>
            </th>
            ))}
        </tr>
        </thead>
    );
}