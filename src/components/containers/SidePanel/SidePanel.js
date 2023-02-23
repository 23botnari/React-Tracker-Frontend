import React, { createRef } from "react";
import "./SidePanel.scss";
import Sidepanelled from "./SidePanelTemplate";
class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue };
  }

  render() {
    const { value } = this.state;

    return (
        <Sidepanelled status="__active" title="test"></Sidepanelled>
    );
  }
}

export default SidePanel;
