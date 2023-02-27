import React from "react";
import "./SidePanel.scss";
const SidePanelTemplate = (props, ref) => {
  const { title } = props;
  const { status } = props;
  return (
    <div className="sidepanela">
      <div className={`SidePanel${status}`}>
        <div className="SidePanel__header">
          <div className="SidePanel__title" ref={ref}>
            {title}
          </div>
          <div className="SidePanel__close">
            <span className=""></span>
          </div>
        </div>
        <div className="SidePanel__content">
          <p> Content </p>
        </div>
        <div className="SidePanel__footer">
          <button>Close</button>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(SidePanelTemplate);
