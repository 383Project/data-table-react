import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/debounce";
import BootstrapSearchBar from "../bootstrap/BootstrapSearchBar";
import BootstrapTable from "../bootstrap/BootstrapTable";
import BootstrapPagination from "../bootstrap/BootstrapPagination";

interface SearchBarProps {
    search?: string;
    setSearch?: (val: string) => void;
    debounceTime?: number;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
    search = "",
    setSearch = () => {},
    debounceTime = 250,
}) => {
    const [display, setDisplay] = useDebounce(search, setSearch, debounceTime);
    return (
        <BootstrapSearchBar
            search={display}
            setSearch={setDisplay}
            debounceTime={debounceTime}
        />
    );
};
