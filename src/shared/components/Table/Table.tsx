import type { HTMLAttributes } from "react";

import Spinner from "../Spinner";
import EmptyState from "../EmptyState";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TablePagination from "./TablePagination";

import type {
    TableColumn,
    TableEmptyState,
    TablePagination as Pagination,
} from "./types";

import "./Table.css";

interface TableProps<T> extends HTMLAttributes<HTMLDivElement> {
    columns: TableColumn<T>[];

    data: T[];

    loading?: boolean;

    hoverable?: boolean;

    striped?: boolean;

    selectable?: boolean;

    stickyHeader?: boolean;

    selectedRows?: T[];

    sortColumn?: string;

    sortDirection?: "asc" | "desc";

    pagination?: Pagination;

    emptyState?: TableEmptyState;

    onRowClick?: (row: T) => void;

    onSort?: (column: string) => void;

    onSelectAll?: (checked: boolean) => void;

    onSelectionChange?: (rows: T[]) => void;
}

export default function Table<T>({
    columns,
    data,
    loading = false,
    hoverable = true,
    striped = false,
    selectable = false,
    stickyHeader = false,
    selectedRows = [],
    sortColumn,
    sortDirection,
    pagination,
    emptyState,
    onRowClick,
    onSort,
    onSelectAll,
    onSelectionChange,
    className = "",
    ...props
    }: TableProps<T>) {
    const classes = [
        "table",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (loading) {
        return (
        <div className="table__loading">
            <Spinner
            label="Cargando información..."
            />
        </div>
        );
    }

    if (data.length === 0) {
        return (
        <EmptyState
            size="md"
            title={
            emptyState?.title ??
            "No hay información"
            }
            description={emptyState?.description}
            action={emptyState?.action}
        />
        );
    }

    return (
        <div
        className={classes}
        {...props}
        >
        <div className="table__container">
            <table>
            <TableHeader
                columns={columns}
                selectable={selectable}
                stickyHeader={stickyHeader}
                selectedCount={
                selectedRows.length
                }
                totalRows={data.length}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
                onSelectAll={onSelectAll}
            />

            <tbody>
                {data.map((row, index) => (
                <TableRow
                    key={index}
                    row={row}
                    index={index}
                    columns={columns}
                    selectable={selectable}
                    selected={selectedRows.includes(
                    row
                    )}
                    hoverable={hoverable}
                    striped={striped}
                    onClick={onRowClick}
                    onSelect={(checked) => {
                    if (!onSelectionChange) {
                        return;
                    }

                    if (checked) {
                        onSelectionChange([
                        ...selectedRows,
                        row,
                        ]);
                    } else {
                        onSelectionChange(
                        selectedRows.filter(
                            (item) =>
                            item !== row
                        )
                        );
                    }
                    }}
                />
                ))}
            </tbody>
            </table>
        </div>

        {pagination && (
            <TablePagination
            pagination={pagination}
            />
        )}
        </div>
    );
}