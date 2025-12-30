
const express = require(`express`)
const router=express.Router()
const { login,
        register,
        getUsers,
        getProfile} = require(`../controllers/authcontrollers`)
const auth= require(`../middlewares/auth`)
const checkRole=require(`../middlewares/roleCheck`)

router.post(`/login`,login)
router.post(`/register`,register)

router.get(`/users`,auth,checkRole(`admin`),getUsers)
router.get(`/me`,auth, getProfile)

module.exports=router



