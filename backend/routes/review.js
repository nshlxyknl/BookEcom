const express= require("express")
const { getreview, addreview } = require("../controllers/reviewcontrollers")
const auth = require("../middlewares/auth")
const router = express.Router()

router.get(`/see/:productId`,getreview)
router.post(`/add/:productId`,auth, addreview)

module.exports=router
