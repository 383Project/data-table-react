import React from "react";
export interface DataTableMetaLink {
    url: string;
    label: string;
    active: boolean;
}
export interface DataTableMeta {
    current_page?: number;
    from?: number;
    last_page?: number;
    links?: DataTableMetaLink[];
    path?: string;
    per_page?: number;
    to?: number;
    total?: number;
    hidden_fields?: string[];
    field_labels?: object;
    sortable_fields?: string[];
    searchable_fields?: string[];
    filterable_fields?: string[];
    sort_by?: string | null;
    direction?: "asc" | "desc" | null;
    page_options?: number[];
}
export interface DataTableLinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}
export interface DataTableResponse {
    data?: object[];
    links?: DataTableLinks;
    meta?: DataTableMeta;
}
export interface DataTableProps {
    endpoint: string;
    endpointMethod: "GET" | "POST";
    endpointParams: object | null | undefined;
    defaults: object | null | undefined;
}
declare const DataTable: React.FC<DataTableProps>;
export default DataTable;
