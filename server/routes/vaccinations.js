const express = require("express");
const vaccinations = require("../controllers/vaccinations")
const router = express.Router();

router.get("/:memberId", vaccinations.getVaccinations)
router.delete("/:memberId", vaccinations.deleteVaccinations)
router.post("",vaccinations.addVaccinations)
router.put("",vaccinations.updateVaccination)

module.exports = router