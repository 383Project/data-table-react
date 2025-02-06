import React from "react";
import { DataTableMeta } from "../DataTable";
interface BootstrapPaginationProps extends React.PropsWithChildren {
    meta: DataTableMeta;
    onPage: (url: string) => void;
    onPerPage: (perPage: number) => void;
}
declare const BootstrapPagination: React.FC<BootstrapPaginationProps>;
export default BootstrapPagination;
