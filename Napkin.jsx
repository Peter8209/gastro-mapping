import React from "react";

const Napkin = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.4, 0.02, 0.4]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

export default Napkin;
