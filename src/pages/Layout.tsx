import { Outlet } from "react-router-dom";

function Layout() {
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
