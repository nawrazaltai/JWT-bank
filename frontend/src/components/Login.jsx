import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

function Login(props) {
  const { setOnline, online } = props;

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const userInput = { usernameInput, passwordInput };

    const response = await fetch("http://localhost:4000/sessions", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });

    const content = await response.json();
    setToken(content.token);
    // setIsLoggedIn(!isLoggedIn);
    setUser(content.user.username);

    setOnline((prevState) => !prevState);
  };

  useEffect(() => {
    if (online) {
      return navigate("/", { state: { token, user } });
    }
  }, [online]);

  return (
    <div className="login-container">
      <div className="form-container login-form-container">
        <h2 className="login-form-title">Login</h2>
        <form className="login-form" onSubmit={submit}>
          <label htmlFor="username">Username</label>
          <AiOutlineUser
            style={{
              position: "absolute",
              fontSize: "1.4rem",
              marginTop: "1.26em",
              marginLeft: "10.8em",
              color: "white",
            }}
          />
          <input
            onChange={(e) => {
              setUsernameInput(e.target.value);
            }}
            type="text"
            id="username"
            required
          />
          <label htmlFor="password">Password</label>
          <RiLockPasswordLine
            style={{
              position: "absolute",
              fontSize: "1.4rem",
              marginTop: "4.65em",
              marginLeft: "10.8em",
              color: "white",
            }}
          />
          <input
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            type="password"
            id="password"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
