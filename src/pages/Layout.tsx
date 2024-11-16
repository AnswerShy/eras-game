import { Outlet } from "react-router-dom";
import AnimationDisabler from "../components/AnimationDisabler";

function Layout() {
  return (
    <>
      <div className="strichka"></div>
      <AnimationDisabler />
      <section className="mainWindow">
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
