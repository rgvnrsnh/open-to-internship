const express = require("express");
const collegeController = require("../controller/collegeController");
const internController = require("../controller/internController");

const router = new express.Router();

router.get("/router", (req, res) => {
    res.send("router working successfully");
});

// for saving college details
router.post("/functionUp/colleges", collegeController.createCollege);

//for saving intern details
router.post("/functionUp/interns", internController.collegeInterns);

//for getting college and their interns details
router.get("/functionUp/:collegeName", collegeController.CollegeDetails);

module.exports = router;