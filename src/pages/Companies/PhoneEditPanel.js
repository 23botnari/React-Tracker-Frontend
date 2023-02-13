import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
export function PhoneEditSidebar(props) {
  const [visibleRight, setVisibleRight] = useState(false);
  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={props.visibleRight}
        position="right"
        onHide={() => props.setVisibleRight(false)}
        className="w-full md:w-20rem lg:w-30rem"
        modal={null}
      >
        <div className="p-sidebar-header">
          <p>123</p>
        </div>
        <h2>Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
    </div>
  );
}
