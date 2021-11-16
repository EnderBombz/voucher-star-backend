const express = require("express");
const app = express();
const cors = require("cors");
const routers = require("./routes/router");

app.use(
  cors({
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vocher Star rest API - 2021");
});

app.use(routers);

app.listen(process.env.PORT || 5000, () => {
  console.log("running on port 5000");
});
