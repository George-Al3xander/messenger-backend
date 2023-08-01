const express = require('express');
const router = express.Router();
const verifyToken = require("../verifyToken.js")

const controllerRoom = require("../controllers/controllerRoom.js")




/* GET users listing. */
router.get('/:id', verifyToken, controllerRoom.get_user_rooms);
router.get('/:id/:roomId', verifyToken, controllerRoom.get_room);
router.get("/:id/:roomId/messages", verifyToken, controllerRoom.get_rooms_messages);

router.post("/:id",verifyToken,controllerRoom.create_room)
router.delete("/:id/:roomId",verifyToken,controllerRoom.delete_room)

module.exports = router;