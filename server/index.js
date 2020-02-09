const express = require("express");
const cors = require("cors");
const app = express();
const chatRoutes = require("./routes/chat");

app.use(express.json());
app.use(cors());
app.use("/send-msg", chatRoutes);

app.listen(3000, () => {
  console.log("server listening in port 3000");
});
