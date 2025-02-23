import React from "react";

const Table = () => {
  return (
    <mesh>
      <cylinderGeometry args={[3, 3, 0.1, 32]} />
      <meshStandardMaterial color="brown" />
    </mesh>
  );
};

export default Table;
