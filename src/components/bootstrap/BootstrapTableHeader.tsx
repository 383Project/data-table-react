import React from "react";
import { DataTableMeta, HeaderField } from "../DataTable";

interface HeaderRowProps {
    fields: HeaderField[];
    onSort: (field: string) => void;
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

const BootstrapHeaderRow: React.FC<HeaderRowProps> = ({ fields, onSort }) => {
    return (
        <thead>
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
                                    onSort(field.name);
                                }}
                            />
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default BootstrapHeaderRow;
