const express = require("express");
const members = require("../controllers/members")
const router = express.Router();

router.get("", members.getMembers)
router.get("/:memberId", members.getMember)
router.delete("/:memberId", members.deleteMember)
router.post("",members.addMember)
router.put("",members.updateMember)
module.exports = router