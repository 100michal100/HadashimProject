const express = require("express");
const corona = require("../controllers/corona")
const router = express.Router();

router.get("/:memberId", corona.getCorona)
router.delete("/:memberId", corona.deleteCorona)
router.post("",corona.addCorona)
router.put("",corona.updateCorona)
module.exports = router