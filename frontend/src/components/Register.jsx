import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import businessWoman from "../assets/business-woman.png";
import { NavLink } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      balance: balance,
    };

    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const content = await response.json();

    setUserRegistered(true);
    // setUsername("");
    // setPassword("");
    // setBalance("");
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h2 className="register-form-title">Sign Up</h2>
        <form className="register-form" action="submit" onSubmit={submit}>
          <div className="createUserDiv">
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
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              placeholder="Enter your username here"
              value={username}
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
                setPassword(e.target.value);
              }}
              type="text"
              id="password"
              placeholder="Enter your password here"
              value={password}
              required
            />
            <label htmlFor="balance">Balance</label>
            <GiMoneyStack
              style={{
                position: "absolute",
                fontSize: "1.4rem",
                marginTop: "8em",
                marginLeft: "10.8em",
                color: "white",
              }}
            />
            <input
              onChange={(e) => {
                setBalance(e.target.value);
              }}
              type="text"
              id="balance"
              placeholder="Enter your cash balance here"
              value={balance}
              required
            />
            <button type="submit" className="register-button">
              Register user
            </button>
          </div>
        </form>
      </div>

      {userRegistered && (
        <div className="user-registered-container">
          <div className="user-registered-info">
            <div
              onClick={() => {
                setUserRegistered(!userRegistered);
              }}
              className="close-span"
            >
              <span>X</span>
            </div>
            <div className="user-registered-div">
              <h3 className="user-registered-title">
                Happy to have you on board {username}!
              </h3>
              <img className="business-woman" src={businessWoman} alt="" />
              <NavLink className={"user-registered-login-btn"} to={"/login"}>
                Login
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
