const express = require("express");
const cors = require("cors");
const gadgetRoutes = require("./routes/gadgetsRoute");
const userRoutes = require("./routes/auth");
const sequelize = require("./config/database");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/gadgets", gadgetRoutes);
app.use("/api/user", userRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

setInterval(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database keep-alive ping successful");
  } catch (error) {
    console.error("Database keep-alive error:", error);
  }
}, 5 * 60 * 1000);