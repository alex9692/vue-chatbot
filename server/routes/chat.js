const express = require("express");
const router = express.Router();

const chatController = require("../controller/chat");

router.route("/").post(chatController.sendmessage);

module.exports = router;
