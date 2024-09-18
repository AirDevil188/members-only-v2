const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const dotenv = require("dotenv");

dotenv.config();

const lengthErr = "must contain at least 1 character";

const validateMessage = [
  body("title").trim().isLength({ min: 1 }).withMessage(`Title ${lengthErr}`),
  body("text").trim().isLength({ min: 1 }).withMessage(`Text ${lengthErr}`),
];

const getMessages = asyncHandler(async (req, res, next) => {
  console.log(res.locals.currentUser.id);
  if (res.locals.currentUser) {
    res.render("messages-form", {
      title: "Create New Message",
    });
  } else {
    res.redirect("/");
  }
});

const postMessages = [
  validateMessage,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("messages-form", {
        title: "Create New Message",
        errors: errors.array(),
      });
    }
    const { title, text } = req.body;
    const { id } = res.locals.currentUser.id;
    console.log(id, "id");
    await db.createNewMessage(title, text, res.locals.currentUser.id);
    res.redirect("/");
  }),
];

module.exports = {
  getMessages,
  postMessages,
};
