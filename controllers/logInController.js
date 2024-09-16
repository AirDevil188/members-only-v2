const asyncHandler = require("express-async-handler");

const getLogIn = asyncHandler(async (req, res, next) => {
  res.render("log-in", {
    title: "Log In",
    user: req.user,
  });
});

module.exports = {
  getLogIn,
};
