import React from "react";
import Atropos from "atropos/react";
import "atropos/css"; 

const ReactAtropos = ({ children, ...props }) => {
  return <Atropos {...props}>{children}</Atropos>;
};

export default ReactAtropos;
