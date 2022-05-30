const express = require("express");
const checkListRouter = require("./src/models/routes/checklist");
const rootRouter = require("./src/models/routes/router_index");
const taskRouter = require("./src/models/routes/task");

const methodOverride = require("method-override");

const path = require("path");
require("./config/database");

const app = express();

app.set("views", path.join(__dirname, "src/models/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public")));

// middleware das rotas
app.use("/checklists", checkListRouter);
app.use("/checklists", taskRouter.checklistDependent);
app.use("/tasks", taskRouter.simple);
app.use("/", rootRouter);

app.listen(3000, () => {
  console.log("rodando");
});
