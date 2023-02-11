import "./App.scss";
import { Sidebar } from "./components/containers/Sidebar/Sidebar";
import { AppRoutes } from "./components/containers/AppRoutes/AppRoutes.js";

function App() {
  return (
    <div className="basic-layout">
      <div className="basic_layout__sidebar">
        <Sidebar />
      </div>
      <div
        className="basic_layout__content"
        style={{
          width: "100%",
          paddingLeft: (Sidebar?.offsetwidth ?? 0) + 280,
          //  paddingLeft: (?.offsetwidth ?? 0) + 30,
        }}
      >
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
