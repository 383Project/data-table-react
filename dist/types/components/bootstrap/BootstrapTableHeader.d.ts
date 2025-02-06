import React from "react";
import { HeaderField } from "../DataTable";
interface HeaderRowProps {
    fields: HeaderField[];
    onSort: (field: string) => void;
}
declare const BootstrapHeaderRow: React.FC<HeaderRowProps>;
export default BootstrapHeaderRow;
