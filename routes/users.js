const express = require('express');
const router = express.Router();
const verifyToken = require("../verifyToken.js")
const controller = require("../controllers/controllerUser.js")




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/", controller.user_register)
router.post("/login", controller.user_login)

module.exports = router;
