const express = require('express');
const router = express.Router();
const verifyToken = require("../verifyToken.js")

const controllerRoom = require("../controllers/controllerRoom.js")




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/",verifyToken,controllerRoom.create_room)

module.exports = router;
