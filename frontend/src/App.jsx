import { useState, useEffect, useCallback } from "react";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Nav from "./components/Nav";
// import Root from "./components/Root";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [online, setOnline] = useState(false);

  return (
    <main>
      <BrowserRouter>
        <Nav online={online} setOnline={setOnline} />

        <Routes>
          <Route path="/" exact element={<Home online={online} />} />
          <Route path="/register" Component={Register} />
          <Route
            path="/login"
            element={<Login setOnline={setOnline} online={online} />}
          />
        </Routes>
        <Outlet />
      </BrowserRouter>
    </main>
  );
}

export default App;
