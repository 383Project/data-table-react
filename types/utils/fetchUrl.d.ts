import type { DataTableResponse } from "../components/DataTable";
declare const fetchUrl: (endpoint: string, method: "GET" | "POST", params?: object | null | undefined) => Promise<DataTableResponse>;
export default fetchUrl;
