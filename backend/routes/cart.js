const express= require(`express`)
const router = express.Router()

const auth=require(`../middlewares/auth`)
const { getcart, deletecart, addcart, clearcart, payc, plus, minus, clean, webhook } = require("../controllers/cartcontrollers")

router.get(`/get`,auth, getcart)
router.post(`/add`,auth, addcart)
router.post(`/plus`,auth, plus)
router.delete(`/delete/:productId`,auth, deletecart)
router.delete(`/clearcart`,auth, clearcart)
router.delete(`/clean/:productId`,auth, clean)
router.post(`/pay`,auth, payc)


module.exports=router