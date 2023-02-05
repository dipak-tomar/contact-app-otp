const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");
const messageController = require("../controllers/messageController");
const smsTwilio = require("../middleware/smsTwillio");

router.post("/contacts", contactController.create);
router.get("/contacts", contactController.list);
router.get("/contacts/:id", contactController.show);
router.delete("/contacts/:id", contactController.destroy);

router.post("/messages", smsTwilio, messageController.create);
router.get("/messages", messageController.list);
router.get("/messages/:id", messageController.show);
router.delete("/messages/:id", messageController.destroy);

module.exports = router;
