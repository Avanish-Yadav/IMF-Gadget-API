const express = require("express");
const gadgetRoutes = require("./routes/gadgetsRoute");
const userRoutes = require("./routes/auth");
const sequelize = require("./config/database");
const port=process.env.PORT

const app = express();
app.use(express.json());
app.use("/gadgets", gadgetRoutes);
app.use("/api/user", userRoutes);

sequelize.sync().then(() => {
  const server=app.listen(0, () => {console.log("Server running on port "+server.address().port)}); 
});
