import React from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function Nav(props) {
  const { setOnline, online } = props;

  const logout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setOnline(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            onClick={logout}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
      </ul>
      {!online ? (
        <ul className="login-register-links-ul">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </ul>
      ) : (
        // <ul>
        //   <li>
        //     <Link onClick={() => setOnline(!online)} to={"/"}>
        //       Logout
        //     </Link>
        //   </li>
        // </ul>
        <ul>
          <li>
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              onClick={logout}
              to={"/"}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
