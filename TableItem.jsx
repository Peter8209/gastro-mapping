import React from "react";

const TableItem = ({ x = 0, y = 0, z = 0 }) => {
    console.log(`📌 Vykresľujem TableItem na (${x}, ${y}, ${z})`);

    return (
        <div
            style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                width: "50px",
                height: "50px",
                backgroundColor: "maroon",
                borderRadius: "50%",
                transform: `translate(${x}px, ${y}px) scale(${1 + z / 50})`,
                transition: "transform 0.5s ease-in-out",
            }}
        >
        </div>
    );
};

export default TableItem;
