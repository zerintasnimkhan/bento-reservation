const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");
const infoRouter = require("./routes/info.route");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", infoRouter);

app.post("/saveToken", (req, res) => {
  const dataToSave = req.body;
  const serializedData = JSON.stringify(dataToSave);
  fs.writeFileSync("token_file.json", serializedData);
  res.status(200).json({ message: "Token saved successfully" });
});

(async function () {
  try {
    await mongoose.connect(config.MONGOOSE_URI);
    console.log("[mongoose]: Connected to DB.");
    app.listen(config.PORT, () =>
      console.log(`[server]: Server is listening on port ${config.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
})();
