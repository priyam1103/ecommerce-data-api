require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 3001;
const mobilelist = require("./mobiles");
const mobile_detailed_list = require("./mobiledetailed");

app.get("/api/products/mobiles", async function (req, res) {
  try {
    res.status(200).json((mobilelist));
  } catch (err) {
    res.status(400).json({ message: "Please try again" });
  }
});
app.get("/api/products/mobile/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (mobilelist.pids.includes(parseInt(id))) {
      for (var i = 0; i < mobilelist.mobiles.length; i++) {
        if (mobilelist.mobiles[i].id == id) {
          res.status(200).json(mobilelist.mobiles[i]);
        }
      }
    }else {
      res.status(400).json({ message: "Mobile id is not valid" });
    }
    
  } catch (err) {
    res.status(400).json({ message: "Please try again" });
  }
});
app.get("/api/products/mobiledetails/:pid", async function (req, res) {
  try {
      const { pid } = req.params;
      
    if (mobile_detailed_list.pids.includes(parseInt(pid))) {
      for (var i = 0; i < mobile_detailed_list.mobiles.length; i++) {
        if (mobile_detailed_list.mobiles[i].id == pid) {
          res.status(200).json(mobile_detailed_list.mobiles[i]);
        }
      }
    } else {
      res.status(400).json({ message: "Mobile id is not valid" });
    }
  } catch (err) {
      console.log(err)
    res.status(400).json({ message: "Please try again" });
  }
});
app.listen(PORT, function () {
  console.log("Running on " + PORT);
});
