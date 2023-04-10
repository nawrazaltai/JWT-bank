import React from "react";
import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import logo from "../assets/business-man.png";
import logo2 from "../assets/business-account.png";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import piggyBank from "../assets/piggy-bank.png";

const Home = (props) => {
  const { state } = useLocation();
  const [userBalance, setUserBalance] = useState();
  const [username, setUsername] = useState("");
  const [hideBalance, setHideBalance] = useState(true);
  const { token, user } = state || {};

  const { online } = props;

  useEffect(() => {
    setUsername(user);
  }, [user]);

  function showBalance() {
    fetch("http://localhost:4000/me/accounts", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserBalance(data.balance));
    setHideBalance(!hideBalance);
  }

  return (
    <div>
      {online ? (
        <div className="logged-in-container">
          <div className="logged-in-content">
            <h1 className="logged-in-user-greeting">Hello {username}!</h1>
            <div className="action-divs">
              <div className="show-balance-accordion">
                <h3> My Cash Balance </h3>
                {hideBalance ? (
                  <AiFillDownCircle
                    onClick={showBalance}
                    style={{
                      fontSize: "1.6rem",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <AiFillUpCircle
                    onClick={showBalance}
                    style={{
                      fontSize: "1.6rem",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>
              <div
                className={`${!hideBalance ? "show-balance" : "balance-div"}`}
              >
                <h3>
                  Cash availabe:
                  <span className="cash-span"> {userBalance} SEK</span>
                </h3>
              </div>
              <img className="piggybank" src={piggyBank} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="landing-container">
          <div className="home-page-not-loggedin">
            <div className="home-page-not-loggedin-text">
              <h1 className="landing-h1">Welcome to the JWT-bank!</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                feugiat semper elit, vitae tempor metus sagittis vitae. Integer
                sapien dui, accumsan vitae tincidunt ac, vulputate nec lorem.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Mauris in lorem dolor. Nulla at mi purus. Integer sit amet
                pulvinar risus.
              </p>
              <NavLink to={"/register"} className={"home-page-signup-btn"}>
                Sign up now
              </NavLink>
            </div>
            <div className="home-page-not-loggedin-img">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="random-section">
            <img src={logo2} alt="" />
            <div className="random-section-text">
              <h1 style={{ marginBottom: ".7em", color: "rgb(37, 47, 70)" }}>
                3 <span>Easy</span> setup steps!
              </h1>
              <ol>
                <li>1. Lorem ipsum.</li>
                <li>2. Lorem ipsum again.</li>
                <li>3. Lorem ipsum text.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
