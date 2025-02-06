const express = require("express");
const gadgetRoutes = require("./routes/gadgetsRoute");
const userRoutes = require("./routes/auth");
const sequelize = require("./config/database");

const app = express();
app.use(express.json());
app.use("/gadgets", gadgetRoutes);
app.use("/api/user", userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
