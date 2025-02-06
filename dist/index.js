import React, { useState, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const fetchUrl = (endpoint_1, method_1, ...args_1) => __awaiter(undefined, [endpoint_1, method_1, ...args_1], undefined, function* (endpoint, method, params = null) {
    const fetchOptions = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (method === "GET") {
        const urlParams = new URLSearchParams(params).toString();
        const response = yield fetch(`${endpoint}${endpoint.includes("?") ? "&" : "?"}${urlParams}`, fetchOptions);
        return response.json();
    }
    else {
        fetchOptions.body = JSON.stringify(params);
        const response = yield fetch(endpoint, fetchOptions);
        return response.json();
    }
});

const BootstrapSearchBar = ({ search = "", setSearch = () => { }, debounceTime = 250, icon = null, disabled = false, }) => {
    const addOnId = React.useId();
    const [display, setDisplay] = useState(search);
    useEffect(() => {
        console.log("debounce start");
        const handler = setTimeout(() => {
            setSearch(display);
        }, debounceTime);
        return () => {
            clearTimeout(handler);
        };
    }, [display]);
    return (React.createElement("div", { className: "input-group mb-3" },
        !!icon && (React.createElement("span", { className: "input-group-text", id: addOnId }, icon)),
        React.createElement("input", { type: "text", className: "form-control", placeholder: "Search", "aria-label": "Search", "aria-describedby": !!icon ? addOnId : undefined, value: display, onChange: (e) => setDisplay(e.target.value) })));
};

const BootstrapTable = ({ children }) => {
    return (React.createElement("table", { className: "table table-striped table-hover table-bordered" }, children));
};

const NavButton = ({ onClick, name, links, children, disabled = false, }) => {
    const url = links === null || links === undefined ? undefined : links[name];
    return (React.createElement("button", { className: `btn btn-sm btn-primary ${disabled ? "disabled" : ""}`, type: "button", disabled: disabled || !url, onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (links === null || links === undefined ? undefined : links[name]) {
                onClick(links === null || links === undefined ? undefined : links[name]);
            }
        } },
        React.createElement("span", { dangerouslySetInnerHTML: { __html: children } })));
};
const BootstrapPagination = ({ meta, links, page, onPage = () => { }, onPerPage = () => { }, }) => {
    var _a, _b;
    return (React.createElement("div", { className: "row" },
        React.createElement("div", { className: "col-sm-6 col-lg-4 mt-2" },
            React.createElement("div", null,
                React.createElement("select", { className: "form-select form-select-sm", onChange: (e) => onPerPage(parseInt(e.target.value)), value: meta.per_page }, (_a = meta === null || meta === undefined ? undefined : meta.page_options) === null || _a === undefined ? undefined : _a.map((item, key) => (React.createElement("option", { key: key, value: item },
                    item,
                    " per page")))))),
        React.createElement("div", { className: "d-none d-lg-flex col-lg-4 justify-content-center align-items-center mt-2" },
            React.createElement("span", { className: "badge bg-secondary" },
                "Showing ",
                meta.from,
                " - ",
                meta.to,
                " of ",
                meta.total)),
        React.createElement("div", { className: "col-sm-6 col-lg-4 mt-2" },
            React.createElement("div", { className: "input-group input-group-sm" },
                React.createElement(NavButton, { links: links, name: "first", onClick: (url) => onPage(url || ""), disabled: meta.current_page === 1 }, "First"),
                React.createElement(NavButton, { links: links, name: "prev", onClick: (url) => onPage(url || "") }, "\u00AB"),
                React.createElement("select", { className: "form-select form-control-sm", value: page, onChange: (e) => onPage(`${meta.path}?page=${e.target.value}`) }, Array.from({ length: (_b = meta.last_page) !== null && _b !== undefined ? _b : 0 }, (_, i) => i + 1).map((page) => (React.createElement("option", { key: page, value: page },
                    "Page ",
                    page,
                    " of ",
                    meta.last_page)))),
                React.createElement(NavButton, { links: links, name: "next", onClick: (url) => onPage(url || "") }, "\u00BB"),
                React.createElement(NavButton, { links: links, name: "last", onClick: (url) => onPage(url || "") }, "Last")))));
};

const ClickableHeaderCell = ({ label, sortable, sorted, direction, onSort, }) => {
    if (sortable) {
        return (React.createElement("button", { type: "button", onClick: onSort },
            label,
            " ",
            sorted && React.createElement(React.Fragment, null, direction === "asc" ? "▲" : "▼")));
    }
    return React.createElement(React.Fragment, null, label);
};
const BootstrapHeaderRow = ({ fields, onSort }) => {
    return (React.createElement("thead", null,
        React.createElement("tr", null, fields.map((field, index) => {
            return (React.createElement("th", { key: index },
                React.createElement(ClickableHeaderCell, { label: field.label, sortable: field.sortable, sorted: field.sorted, direction: field.direction, onSort: () => {
                        onSort(field.name);
                    } })));
        }))));
};

const DataTable = ({ endpoint: defaultEndpoint, endpointMethod = "GET", endpointParams = {}, defaults, }) => {
    var _a, _b;
    const [endpoint, setEndpoint] = useState(defaultEndpoint);
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({
        hidden_fields: [],
        field_labels: {},
        sortable_fields: [],
        searchable_fields: [],
        filterable_fields: [],
        sort_by: null,
        direction: null,
        page_options: [],
    });
    const [links, setLinks] = useState(undefined);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [filters, setFilters] = useState([]);
    useEffect(() => {
        if (endpoint) {
            const params = Object.assign(Object.assign({}, endpointParams), { per_page: perPage, sort: sortBy, direction: sortDirection, search,
                filters });
            setLoading(true);
            fetchUrl(endpoint, endpointMethod, params)
                .then((response) => {
                const { data, meta, links } = response;
                setData(data || []);
                setMeta(meta || {
                    hidden_fields: [],
                    field_labels: {},
                    sortable_fields: [],
                    searchable_fields: [],
                    filterable_fields: [],
                    sort_by: null,
                    direction: null,
                    page_options: [],
                });
                setLinks(links);
            })
                .then(() => {
                setLoading(false);
            });
        }
    }, [endpoint, perPage, sortBy, sortDirection, search]);
    const keys = Object.keys((_a = data[0]) !== null && _a !== undefined ? _a : {});
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
    return (React.createElement("div", null,
        React.createElement(BootstrapSearchBar, { search: search, setSearch: setSearch, disabled: loading }),
        !loading && !!data && (React.createElement(React.Fragment, null,
            React.createElement(BootstrapTable, null,
                React.createElement(BootstrapHeaderRow, { fields: fields, onSort: (field) => {
                        setSortBy(field);
                        if (field != sortBy) {
                            setSortDirection("asc");
                        }
                        else {
                            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                        }
                    } }),
                React.createElement("tbody", null, data.map((row, index) => (React.createElement("tr", { key: index }, fields.map((field, index) => (React.createElement("td", { key: index }, row[field.name])))))))),
            React.createElement(BootstrapPagination, { meta: meta, links: links, page: (_b = meta.current_page) !== null && _b !== undefined ? _b : 1, onPage: setEndpoint, onPerPage: setPerPage }))),
        !loading && !data && React.createElement("div", null, "No data found"),
        !!loading && (React.createElement(React.Fragment, null,
            !!search && (React.createElement("div", null, "No results; please try clearing your search")),
            !!search && React.createElement("div", null, "There is no data to show here yet.")))));
};

export { DataTable as default };
//# sourceMappingURL=index.js.map
