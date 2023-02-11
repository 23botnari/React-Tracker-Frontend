import "./App.scss";
import { SideMenu } from "./components/containers/SideMenu/SideMenu";
import { AppRoutes } from "./components/containers/AppRoutes/AppRoutes.js";

function App() {
  return (
    <div className="basic-layout">
      <div className="basic_layout__sidebar">
        <SideMenu />
      </div>
      <div
        className="basic_layout__content"
        style={{
          width: "100%",
          paddingLeft: (SideMenu?.offsetwidth ?? 0) + 280,
          //  paddingLeft: (?.offsetwidth ?? 0) + 30,
        }}
      >
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
