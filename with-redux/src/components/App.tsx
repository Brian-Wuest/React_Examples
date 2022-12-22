import { Outlet } from "react-router-dom";
import Header from './common/Header';

function App() {
  return (
    <>
      <div id="app" className="container-fluid">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
