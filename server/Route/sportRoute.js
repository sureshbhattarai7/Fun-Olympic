const router = require("express").Router();
const sportController = require("../Controller/sportsController");
const sportapi = require("../ApiStore/Sportsapi");
const highlights = require('./../APIStore/highlights');

router.route("/").post(sportController.createSports).get(sportController.getSports);
router.get("/news", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: sportapi
        })

    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error
        })
    }

});

router.get("/highlights", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: highlights
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error
        })
    }
})
router.route("/:id").get(sportController.getSport);

module.exports = router;