import Button from "../Button";

import type { TablePagination as Pagination } from "./types";

interface TablePaginationProps {
    pagination: Pagination;

    rowsPerPageOptions?: number[];
}

export default function TablePagination({
    pagination,
    rowsPerPageOptions = [10, 20, 50, 100],
    }: TablePaginationProps) {
    const {
        page,
        pageSize,
        totalElements,
        totalPages,
        onPageChange,
        onPageSizeChange,
    } = pagination;

    const firstItem =
        totalElements === 0
        ? 0
        : page * pageSize + 1;

    const lastItem = Math.min(
        (page + 1) * pageSize,
        totalElements
    );

    return (
        <div className="table-pagination">
        <div className="table-pagination__info">
            Mostrando {firstItem} - {lastItem} de{" "}
            {totalElements} registros
        </div>

        <div className="table-pagination__controls">
            <div className="table-pagination__rows">
            <label htmlFor="rows-per-page">
                Filas por página
            </label>

            <select
                id="rows-per-page"
                value={pageSize}
                onChange={(event) =>
                onPageSizeChange?.(
                    Number(event.target.value)
                )
                }
            >
                {rowsPerPageOptions.map((size) => (
                <option
                    key={size}
                    value={size}
                >
                    {size}
                </option>
                ))}
            </select>
            </div>

            <Button
            variant="secondary"
            size="sm"
            disabled={page === 0}
            onClick={() => onPageChange(0)}
            aria-label="Primera página"
            >
            «
            </Button>

            <Button
            variant="secondary"
            size="sm"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
            aria-label="Página anterior"
            >
            ‹
            </Button>

            <span className="table-pagination__page">
            Página {page + 1} de {Math.max(totalPages, 1)}
            </span>

            <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => onPageChange(page + 1)}
            aria-label="Página siguiente"
            >
            ›
            </Button>

            <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => onPageChange(totalPages - 1)}
            aria-label="Última página"
            >
            »
            </Button>
        </div>
        </div>
    );
}