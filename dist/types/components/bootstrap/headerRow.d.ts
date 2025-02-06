import React from "react";
import { DataTableMeta } from "../DataTable";
interface HeaderRowProps {
    meta: DataTableMeta;
    data: object[];
    sortBy: string | null;
    sortDirection: "asc" | "desc" | null;
}
declare const HeaderRow: React.FC<HeaderRowProps>;
export default HeaderRow;
