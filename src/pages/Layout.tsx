import { Outlet } from "react-router-dom";
import EnviromentScript from "../utils/envScript";

function Layout() {
  EnviromentScript()
  return (
    <>
      <div className="strichka"></div>
      <section className="mainWindow">
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
