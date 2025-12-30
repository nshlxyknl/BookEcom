const express = require("express");
const { pending, updateSalesStatus, getsales, getBuyerOrders } = require("../controllers/salescontrollers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/pending", auth, pending);
router.put("/:id/status",auth,  updateSalesStatus);
router.get("/sales",auth,  getsales);
router.get("/orders",auth,  getBuyerOrders);

module.exports = router;
