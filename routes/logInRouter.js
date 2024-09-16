const { Router } = require("express");
const passport = require("passport");

const logInRouter = Router();

const logInController = require("../controllers/logInController");

logInRouter.get("/", logInController.getLogIn);

logInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = logInRouter;
