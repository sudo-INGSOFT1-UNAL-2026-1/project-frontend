import Checkbox from "../Checkbox";

import type {
    TableColumn,
    TableSortDirection,
} from "./types";

interface TableHeaderProps<T> {

    columns: TableColumn<T>[];

    selectable?: boolean;

    stickyHeader?: boolean;

    selectedCount?: number;

    totalRows?: number;

    sortColumn?: string;

    sortDirection?: TableSortDirection;

    onSort?: (
        column: string
    ) => void;

    onSelectAll?: (
        checked: boolean
    ) => void;
}

export default function TableHeader<T>({
    columns,
    selectable = false,
    stickyHeader = false,
    selectedCount = 0,
    totalRows = 0,
    sortColumn,
    sortDirection,
    onSort,
    onSelectAll,
}: TableHeaderProps<T>) {

    const allSelected =
        totalRows > 0 &&
        selectedCount === totalRows;

    return (
        <thead
            className={
                stickyHeader
                    ? "table__header table__header--sticky"
                    : "table__header"
            }
        >
            <tr>

                {selectable && (
                    <th className="table__checkbox">

                        <Checkbox
                            checked={allSelected}
                            onChange={(event) =>
                                onSelectAll?.(
                                    event.target.checked
                                )
                            }
                        />

                    </th>
                )}

                {columns.map((column) => {

                    const sortable =
                        column.sortable &&
                        !!onSort;

                    const active =
                        sortColumn ===
                        String(column.key);

                    return (
                        <th
                            key={String(column.key)}
                            className={[
                                "table__head",
                                column.align &&
                                    `table__head--${column.align}`,
                                sortable &&
                                    "table__head--sortable",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            style={{
                                width: column.width,
                            }}
                            onClick={() => {
                                if (!sortable) return;

                                onSort?.(
                                    String(column.key)
                                );
                            }}
                        >

                            <span className="table__head-content">

                                {column.title}

                                {active && (
                                    <span className="table__sort">
                                        {sortDirection ===
                                        "asc"
                                            ? "▲"
                                            : "▼"}
                                    </span>
                                )}

                            </span>

                        </th>
                    );
                })}

            </tr>
        </thead>
    );
}