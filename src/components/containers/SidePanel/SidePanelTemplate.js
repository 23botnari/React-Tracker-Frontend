import React from "react";
import "./SidePanel.scss";
const SidePanelTemplate = (props, ref) => {
  const { title } = props;
  const { content } = props;
  return (
    <div className="sidepanela">
      <div className="SidePanel__header">
        <div className="SidePanel__title" ref={ref}>
          {title}
        </div>
        <div className="SidePanel__close">
          <span className=""></span>
        </div>
      </div>
      <div className="SidePanel__content">
         {content} 
      </div>
      <div className="SidePanel__footer">
        <button>Close</button>
      </div>
    </div>
  );
};

export default React.forwardRef(SidePanelTemplate);
