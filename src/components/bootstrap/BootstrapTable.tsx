import React from "react";

const BootstrapTable: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <table className="table table-striped table-hover table-bordered">
            {children}
        </table>
    );
};

export default BootstrapTable;
