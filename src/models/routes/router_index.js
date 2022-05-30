const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("../views/index");
  console.log("../views/index");
});

module.exports = router;
