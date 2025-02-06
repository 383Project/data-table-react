import React from "react";
import { DataTableLinks, DataTableMeta } from "../DataTable";

interface BootstrapPaginationProps extends React.PropsWithChildren {
    meta: DataTableMeta;
    onPage: (url: string) => void;
    onPerPage: (perPage: number) => void;
    page: number;
    links?: DataTableLinks;
}

interface NavButtonProps extends React.PropsWithChildren {
    onClick: (url: string) => void;
    name: "first" | "last" | "prev" | "next";
    links?: DataTableLinks;
    disabled?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
    onClick,
    name,
    links,
    children,
    disabled = false,
}) => {
    const url = links?.[name];

    return (
        <button
            className={`btn btn-sm btn-primary ${disabled ? "disabled" : ""}`}
            type="button"
            disabled={disabled || !url}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (links?.[name]) {
                    onClick(links?.[name]);
                }
            }}
        >
            <span dangerouslySetInnerHTML={{ __html: children as string }} />
        </button>
    );
};

const BootstrapPagination: React.FC<BootstrapPaginationProps> = ({
    meta,
    links,
    page,
    onPage = () => {},
    onPerPage = () => {},
}) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-lg-4 mt-2">
                <div>
                    <select
                        className="form-select form-select-sm"
                        onChange={(e) => onPerPage(parseInt(e.target.value))}
                        value={meta.per_page}
                    >
                        {meta?.page_options?.map((item, key) => (
                            <option key={key} value={item}>
                                {item} per page
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="d-none d-lg-flex col-lg-4 justify-content-center align-items-center mt-2">
                <span className="badge bg-secondary">
                    Showing {meta.from} - {meta.to} of {meta.total}
                </span>
            </div>
            <div className="col-sm-6 col-lg-4 mt-2">
                <div className="input-group input-group-sm">
                    <NavButton
                        links={links}
                        name="first"
                        onClick={(url) => onPage(url || "")}
                        disabled={meta.current_page === 1}
                    >
                        First
                    </NavButton>
                    <NavButton
                        links={links}
                        name="prev"
                        onClick={(url) => onPage(url || "")}
                    >
                        &laquo;
                    </NavButton>
                    <select
                        className="form-select form-control-sm"
                        value={page}
                        onChange={(e) =>
                            onPage(`${meta.path}?page=${e.target.value}`)
                        }
                    >
                        {Array.from(
                            { length: meta.last_page ?? 0 },
                            (_, i) => i + 1
                        ).map((page) => (
                            <option key={page} value={page}>
                                Page {page} of {meta.last_page}
                            </option>
                        ))}
                    </select>
                    <NavButton
                        links={links}
                        name="next"
                        onClick={(url) => onPage(url || "")}
                    >
                        &raquo;
                    </NavButton>
                    <NavButton
                        links={links}
                        name="last"
                        onClick={(url) => onPage(url || "")}
                    >
                        Last
                    </NavButton>
                </div>
            </div>
        </div>
    );
};

export default BootstrapPagination;
