import React, { useEffect, useState } from "react";
import fetchUrl from "../utils/fetchUrl";
import BootstrapSearchBar from "./bootstrap/BootstrapSearchBar";
import BootstrapTable from "./bootstrap/BootstrapTable";
import BootstrapPagination from "./bootstrap/BootstrapPagination";
import BootstrapHeaderRow from "./bootstrap/BootstrapTableHeader";

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

    hidden_fields: string[];
    field_labels: { [key: string]: any };
    sortable_fields: string[];
    searchable_fields: string[];
    filterable_fields: string[];
    sort_by: string | null;
    direction: "asc" | "desc" | null;
    page_options: number[];
}

export interface HeaderField {
    name: string;
    label: string;
    sortable: boolean;
    searchable: boolean;
    filterable: boolean;
    sorted: boolean;
    direction: "asc" | "desc" | null;
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

const DataTable: React.FC<DataTableProps> = ({
    endpoint: defaultEndpoint,
    endpointMethod = "GET",
    endpointParams = {},
    defaults,
}) => {
    const [endpoint, setEndpoint] = useState<string>(defaultEndpoint);
    const [data, setData] = useState<Record<string, any>[]>([]);
    const [meta, setMeta] = useState<DataTableMeta>({
        hidden_fields: [],
        field_labels: {},
        sortable_fields: [],
        searchable_fields: [],
        filterable_fields: [],
        sort_by: null,
        direction: null,
        page_options: [],
    });
    const [links, setLinks] = useState<DataTableLinks | undefined>(undefined);
    const [search, setSearch] = useState<string>("");
    const [perPage, setPerPage] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
        "asc"
    );
    const [filters, setFilters] = useState<object[] | []>([]);

    useEffect(() => {
        if (endpoint) {
            const params = {
                ...endpointParams,
                per_page: perPage,
                sort_by: sortBy,
                direction: sortDirection,
                search,
                filters,
            };
            setLoading(true);

            fetchUrl(endpoint, endpointMethod, params)
                .then((response: DataTableResponse) => {
                    const { data, meta, links } = response;
                    setData(data || []);
                    setMeta(
                        meta || {
                            hidden_fields: [],
                            field_labels: {},
                            sortable_fields: [],
                            searchable_fields: [],
                            filterable_fields: [],
                            sort_by: null,
                            direction: null,
                            page_options: [],
                        }
                    );
                    setLinks(links);
                })
                .then(() => {
                    setLoading(false);
                });
        }
    }, [endpoint, perPage, sortBy, sortDirection, search]);

    const keys = Object.keys(data[0] ?? {});
    const fields = keys
        .map((key, index) => {
            return {
                name: key,
                label: meta.field_labels[key] || key,
                sortable: meta.sortable_fields.includes(key),
                searchable: meta.searchable_fields.includes(key),
                filterable: meta.filterable_fields.includes(key),
                sorted: sortBy === key,
                direction: sortDirection,
            };
        })
        .filter((field) => !meta.hidden_fields.includes(field.name));

    return (
        <div>
            <BootstrapSearchBar
                search={search}
                setSearch={setSearch}
                disabled={loading}
            />
            {!loading && !!data && (
                <>
                    <BootstrapTable>
                        <BootstrapHeaderRow
                            fields={fields}
                            onSort={(field) => {
                                setSortBy(field);
                                if (field != sortBy) {
                                    setSortDirection("asc");
                                } else {
                                    setSortDirection(
                                        sortDirection === "asc" ? "desc" : "asc"
                                    );
                                }
                            }}
                        />
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {fields.map((field, index) => (
                                        <td key={index}>{row[field.name]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </BootstrapTable>
                    <BootstrapPagination
                        meta={meta}
                        links={links}
                        page={meta.current_page ?? 1}
                        onPage={setEndpoint}
                        onPerPage={setPerPage}
                    />
                </>
            )}
            {!loading && !data && <div>No data found</div>}
            {!!loading && (
                <>
                    {!!search && (
                        <div>No results; please try clearing your search</div>
                    )}
                    {!!search && <div>There is no data to show here yet.</div>}
                </>
            )}
        </div>
    );
};

export default DataTable;
