import React from "react";
import Atropos from "atropos/react";
import "atropos/css"; // ensures 3D styles

const ReactAtropos = ({ children, ...props }) => {
  return <Atropos {...props}>{children}</Atropos>;
};

export default ReactAtropos;
