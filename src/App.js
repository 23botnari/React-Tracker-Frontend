import "./App.scss";
import { SideMenu } from "./components/containers/SideMenu/SideMenu";
import { AppRoutes } from "./components/containers/AppRoutes/AppRoutes.js";

function App() {
  return (
    <div className="basic-layout">
      <div className="basic_layout__sidebar">
        <SideMenu></SideMenu>
      </div>
      <div
        className="basic_layout__content"
        style={{
          width: "100%",
          paddingLeft: (SideMenu?.offsetwidth ?? 0) + 280,
          //paddingRight: (SidePanel?.offsetwidth ?? 0) + 30,
        }}
      >
        <AppRoutes></AppRoutes>
      </div>
      <div className="basic_layout__SidePanel">
        
      </div>
    </div>
  );
}

export default App;
