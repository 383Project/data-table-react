import type { DataTableResponse } from "../components/DataTable";

const fetchUrl = async (
    endpoint: string,
    method: "GET" | "POST",
    params: object | null | undefined = null
): Promise<DataTableResponse> => {
    const fetchOptions: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (method === "GET") {
        const urlParams = new URLSearchParams(params as any).toString();
        const response = await fetch(
            `${endpoint}${endpoint.includes("?") ? "&" : "?"}${urlParams}`,
            fetchOptions
        );
        return response.json();
    } else {
        fetchOptions.body = JSON.stringify(params);
        const response = await fetch(endpoint, fetchOptions);
        return response.json();
    }
};

export default fetchUrl;
