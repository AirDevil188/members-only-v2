const { Router } = require("express");
const passport = require("passport");

const logInRouter = Router();

const logInController = require("../controllers/logInController");
const messagesController = require("../controllers/messagesController");

logInRouter.get("/", logInController.getLogIn);

logInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
logInRouter.post("/:id/delete", messagesController.deleteMessage);

module.exports = logInRouter;
