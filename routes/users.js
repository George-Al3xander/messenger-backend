const express = require('express');
const router = express.Router();
const verifyToken = require("../verifyToken.js")
const controllerUser = require("../controllers/controllerUser.js")
const controllerRoom = require("../controllers/controllerRoom.js")




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/", controllerUser.user_register)
router.put("/:id", verifyToken, controllerUser.user_edit)
router.post("/login", controllerUser.user_login)
router.get("/:id/current", verifyToken, controllerUser.get_user_current)
router.get("/:id/search", verifyToken,controllerUser.user_search)
//router.post("/users", controllerUser.user_login)

module.exports = router;
