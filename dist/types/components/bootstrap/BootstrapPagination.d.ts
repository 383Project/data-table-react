import React from "react";
import { DataTableLinks, DataTableMeta } from "../DataTable";
interface BootstrapPaginationProps extends React.PropsWithChildren {
    meta: DataTableMeta;
    onPage: (url: string) => void;
    onPerPage: (perPage: number) => void;
    page: number;
    links?: DataTableLinks;
}
declare const BootstrapPagination: React.FC<BootstrapPaginationProps>;
export default BootstrapPagination;
