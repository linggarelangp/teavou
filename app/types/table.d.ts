export interface Column<T> {
    header: string;
    accessor: keyof T;
};