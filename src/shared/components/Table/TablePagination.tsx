import Button from "../Button";
import Select from "../Select";

import type { TablePagination as TablePaginationProps } from "./types";

interface Props {

    pagination: TablePaginationProps;
}

const PAGE_SIZE_OPTIONS = [
    {
        value: "10",
        label: "10"
    },
    {
        value: "20",
        label: "20"
    },
    {
        value: "50",
        label: "50"
    },
    {
        value: "100",
        label: "100"
    },
];

export default function TablePagination({
    pagination,
}: Props) {

    const {
        page,
        pageSize,
        totalElements,
        totalPages,
        onPageChange,
        onPageSizeChange,
    } = pagination;

    const firstPage =
        page <= 1;

    const lastPage =
        page >= totalPages;

    return (
        <div className="table-pagination">

            <div className="table-pagination__info">

                <span>
                    {totalElements} registros
                </span>

                <span>
                    Página {page} de {totalPages}
                </span>

            </div>

            {onPageSizeChange && (

                <div className="table-pagination__size">

                    <Select
                        value={pageSize}
                        options={PAGE_SIZE_OPTIONS}
                        onChange={(event) =>
                            onPageSizeChange(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    />

                </div>

            )}

            <div className="table-pagination__actions">

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={firstPage}
                    onClick={() =>
                        onPageChange(1)
                    }
                >
                    {"<<"}
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={firstPage}
                    onClick={() =>
                        onPageChange(page - 1)
                    }
                >
                    {"<"}
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={lastPage}
                    onClick={() =>
                        onPageChange(page + 1)
                    }
                >
                    {">"}
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={lastPage}
                    onClick={() =>
                        onPageChange(totalPages)
                    }
                >
                    {">>"}
                </Button>

            </div>

        </div>
    );
}