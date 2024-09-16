const express = require("express");
const path = require("node:path");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

const signUpRouter = require("./routes/signUpRouter");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
require("./middlewares/passport");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/sign-up", signUpRouter);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).send(err);
});

app.listen(port, () => console.log(`App is listening on the ${port}`));
