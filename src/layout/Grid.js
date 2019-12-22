import React from 'react';
import "./grid.scss";

const Grid = ({children}) => {
    return (
        <div className="grid">
            {children}
        </div>
    );
}

export default Grid;
