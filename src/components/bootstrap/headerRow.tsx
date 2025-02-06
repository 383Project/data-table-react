import React from "react";
import { DataTableMeta } from "../DataTable";

interface HeaderRowProps {
    meta: DataTableMeta;
    data: object[];
    sortBy: string | null;
    sortDirection: "asc" | "desc" | null;
}

interface HeaderField {
    name: string;
    label: string;
    sortable: boolean;
    searchable: boolean;
    filterable: boolean;
    sorted: boolean;
    direction: "asc" | "desc" | null;
}

interface HeaderCellProps extends React.PropsWithChildren {
    label: string;
    sortable: boolean;
    sorted: boolean;
    direction: "asc" | "desc" | null;
    onSort: () => void;
}

const ClickableHeaderCell: React.FC<HeaderCellProps> = ({
    label,
    sortable,
    sorted,
    direction,
    onSort,
}) => {
    if (sortable) {
        return (
            <button type="button" onClick={onSort}>
                {label} {sorted && <>{direction === "asc" ? "▲" : "▼"}</>}
            </button>
        );
    }
    return <>{label}</>;
};

const HeaderRow: React.FC<HeaderRowProps> = ({
    meta,
    data,
    sortBy,
    sortDirection,
}) => {
    const keys = Object.keys(data[0]);
    const fields = keys.map((key, index) => {
        return {
            name: key,
            label: meta.field_labels[key],
            sortable: meta.sortable_fields.includes(key),
            searchable: meta.searchable_fields.includes(key),
            filterable: meta.filterable_fields.includes(key),
            sorted: sortBy === key,
            direction: sortDirection,
        };
    });
    return (
        <tr>
            {fields.map((field, index) => {
                return (
                    <th key={index}>
                        <ClickableHeaderCell
                            label={field.label}
                            sortable={field.sortable}
                            sorted={field.sorted}
                            direction={field.direction}
                            onSort={() => {
                                console.log("sort by", field.name);
                            }}
                        />
                    </th>
                );
            })}
        </tr>
    );
};

export default HeaderRow;
