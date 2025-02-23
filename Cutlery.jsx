import React from "react";

const Cutlery = ({ position, rotation }) => {
  return (
    <mesh position={position} rotation={[0, rotation, 0]}>
      <boxGeometry args={[0.1, 0.02, 0.5]} />
      <meshStandardMaterial color="silver" />
    </mesh>
  );
};

export default Cutlery;
