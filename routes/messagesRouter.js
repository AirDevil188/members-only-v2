const { Router } = require("express");

const messagesRouter = Router();

const messagesController = require("../controllers/messagesController");

messagesRouter.get("/", messagesController.getMessages);

messagesRouter.post("/", messagesController.postMessages);

module.exports = messagesRouter;
