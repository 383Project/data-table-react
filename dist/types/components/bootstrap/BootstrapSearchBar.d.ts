import React from "react";
interface BootstrapSearchBarProps {
    search: string;
    setSearch: (val: string) => void;
    debounceTime?: number;
    icon?: React.ReactNode;
    disabled?: boolean;
}
declare const BootstrapSearchBar: React.FC<BootstrapSearchBarProps>;
export default BootstrapSearchBar;
