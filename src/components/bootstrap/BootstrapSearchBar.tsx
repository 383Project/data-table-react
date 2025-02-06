import React, { useEffect, useState, useRef } from "react";

interface BootstrapSearchBarProps {
    search: string;
    setSearch: (val: string) => void;
    debounceTime?: number;
    icon?: React.ReactNode;
    disabled?: boolean;
}

const BootstrapSearchBar: React.FC<BootstrapSearchBarProps> = ({
    search = "",
    setSearch = () => {},
    debounceTime = 250,
    icon = null,
    disabled = false,
}) => {
    const addOnId = React.useId();
    const [display, setDisplay] = useState<string>(search);

    useEffect(() => {
        console.log("debounce start");
        const handler = setTimeout(() => {
            setSearch(display);
        }, debounceTime);

        return () => {
            clearTimeout(handler);
        };
    }, [display]);
    return (
        <div className="input-group mb-3">
            {!!icon && (
                <span className="input-group-text" id={addOnId}>
                    {icon}
                </span>
            )}
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby={!!icon ? addOnId : undefined}
                value={display}
                onChange={(e) => setDisplay(e.target.value)}
            />
        </div>
    );
};

export default BootstrapSearchBar;
