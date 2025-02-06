import React from 'react';

interface DataTableProps {
    endpoint: string;
    endpointMethod: "GET" | "POST";
    endpointParams: object | null | undefined;
    defaults: object | null | undefined;
}
declare const DataTable: React.FC<DataTableProps>;

export { DataTable as default };
