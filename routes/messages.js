const express = require('express');
const router = express.Router();
const verifyToken = require("../verifyToken.js")
const controllerMessage = require("../controllers/controllerMessage.js")


router.get("/:id",verifyToken, (req,res) => {
    res.json({msg: "We good!"})
})

router.post("/:id",verifyToken,controllerMessage.post_message)

router.put("/:id/:messageId",verifyToken,controllerMessage.put_message)
router.delete("/:id/:messageId",verifyToken,controllerMessage.delete_message)

module.exports = router;