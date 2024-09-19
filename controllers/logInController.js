const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getLogIn = asyncHandler(async (req, res, next) => {
  const messages = await db.getMessages();
  res.render("log-in", {
    title: "Log In",
    messages: messages,
  });
});

module.exports = {
  getLogIn,
};
