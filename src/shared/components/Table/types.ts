import type { ReactNode } from "react";

export type TableAlign =
    | "left"
    | "center"
    | "right";

export interface TableColumn<T> {
    key: keyof T | string;

    title: ReactNode;

    width?: string;

    align?: TableAlign;

    sortable?: boolean;

    render?: (
        row: T,
        index: number
    ) => ReactNode;
}
export interface TablePagination {

    page: number;

    pageSize: number;

    totalElements: number;

    totalPages: number;

    onPageChange: (
        page: number
    ) => void;

    onPageSizeChange?: (
        pageSize: number
    ) => void;
}

export interface TableEmptyState {

    title: ReactNode;

    description?: ReactNode;

    action?: ReactNode;
}