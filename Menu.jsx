import React from "react";

const Menu = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, 0.1, 0.7]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Menu;
