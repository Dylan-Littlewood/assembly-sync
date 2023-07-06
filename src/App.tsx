import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";


function App() {
  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <Navigation />
      <Outlet />
    </div>
  );
}


export default App;
