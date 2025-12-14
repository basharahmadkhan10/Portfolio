import React, { useEffect, useRef } from "react";
import Atropos from "atropos";
import "atropos/css";

const ReactAtropos = ({
  children,
  className = "",
  rotateXMax = 25,
  rotateYMax = 25,
  rotateTouch = true,
  shadow = true,
  highlight = true,
  onEnter,
  onLeave,
  onRotate,
  activeOffset = 50,
  shadowScale = 1.05,
  duration = 1500,
  ...props
}) => {
  const atroposRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (atroposRef.current) {
      instanceRef.current = Atropos({
        el: atroposRef.current,
        rotateXMax,
        rotateYMax,
        rotateTouch,
        shadow,
        highlight,
        activeOffset,
        shadowScale,
        duration,
        onEnter,
        onLeave,
        onRotate,
      });
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [
    rotateXMax,
    rotateYMax,
    rotateTouch,
    shadow,
    highlight,
    activeOffset,
    shadowScale,
    duration,
  ]);

  return (
    <div ref={atroposRef} className={`atropos ${className}`} {...props}>
      <div className="atropos-scale">
        <div className="atropos-rotate">
          <div className="atropos-inner">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ReactAtropos;
