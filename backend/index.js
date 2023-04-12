import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mysql from "mysql";

const app = express();
const PORT = 4000;
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "bankjwt",
});

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const users = [];
const accounts = [];
let count = 0;

app.use(bodyParser.json());
app.use(cookieParser());

app.post("/users", (req, res) => {
  //   console.log(req.body);
  //   let userId = uuidv4();
  //   let username = req.body.username;
  //   const user = {
  //     id: userId,
  //     username: username,
  //     password: req.body.password,
  //   };
  //   users.push(user);

  //   let balance = req.body.balance;
  //   const account = {
  //     id: count,
  //     userId: userId,
  //     balance: balance,
  //   };
  //   accounts.push(account);
  //   count += 1;
  //   res.json({ user, account });

  const user = req.body;
  const { username, password, balance } = user;

  connection.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const userId = result.insertId;
        connection.query(
          "INSERT INTO accounts (user_id, balance) VALUES (?, ?)",
          [userId, balance],
          (err, result) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.send({ message: "OK" });
            }
          }
        );
      }
    }
  );
});

function generateAccessToken(username) {
  return jwt.sign(username.id, process.env.ACCESS_TOKEN_SECRET);
}

// app.post("/sessions", (req, res) => {
//   //   console.log("sessions");
//   const userInput = req.body;

//   const user = users.find((u) => u.username == userInput.usernameInput);

//   if (user.password == userInput.passwordInput) {
//     const token = generateAccessToken(user);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       SameSite: "none",
//       credentials: true,
//       //   authorization: "Bearer" + token,
//     });
//     res.json({ token, user });
//   } else {
//     res.json("fail");
//   }
// });

app.post("/sessions", (req, res) => {
  //   console.log("sessions");
  const userInput = req.body;
  const { usernameInput, passwordInput } = userInput;

  connection.query(
    "SELECT * FROM users WHERE (username, password) = (?, ?)",
    [usernameInput, passwordInput],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const user = result[0];
        // req.user = user;
        const token = generateAccessToken(user);

        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          SameSite: "none",
          credentials: true,
          //   authorization: "Bearer" + token,
        });

        res.json({ user, token });
      }
    }
  );
});

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (token == undefined) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
    if (err) {
      res.sendStatus(403);
    } else {
      req.userId = userId;
      next();
    }
  });
}

// app.get("/me/accounts", authenticateToken, (req, res) => {
//   const userId = req.userId;
//   // res.cookie = req.cookies["token"]

//   accounts.map((account) => {
//     if (account.userId == userId) {
//       const user = users.find((user) => user.id == userId);
//       res.json({ balance: account.balance, username: user.username });
//     }
//   });
// });

app.get("/me/accounts", authenticateToken, (req, res) => {
  const userId = req.userId;
  //   console.log(req.user);
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const username = result[0].username;
        connection.query(
          "SELECT balance FROM accounts WHERE user_id = ?",
          [userId],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              const balance = result[0].balance;
              res.json({ username, balance });
            }
          }
        );
      }
    }
  );
  // res.cookie = req.cookies["token"]

  //   accounts.map((account) => {
  //     if (account.userId == userId) {
  //       const user = users.find((user) => user.id == userId);
  //       res.json({ balance: account.balance, username: user.username });
  //     }
  //   });
});

app.post("/logout", (req, res) => {
  //   console.log(req.cookies);
  res.clearCookie("token");
  res.send({ message: "ok" });
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log("DB Connected");
      console.log("Server started on port " + PORT);
    });
  }
});
