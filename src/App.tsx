import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/navigation";
import Sidebar from "./components/navigation/sidebar";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Navigation />
      <div className="flex justify-between w-full h-full overflow-hidden">
        <Sidebar />
        <div className="bg-secondary w-full flex flex-col items-center justify-center rounded-tl-3xl relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


export default App;
