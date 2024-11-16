import { Link } from "react-router-dom";

export default function NoPage() {
  const style = {
    textDecoration: "underline",
  };
  return (
    <>
      <div className="strichka"></div>
      <section className="mainWindow">
        Хибна сторінка, повернутися{" "}
        <Link style={style} to={"/"}>
          назад
        </Link>
      </section>
    </>
  );
}
