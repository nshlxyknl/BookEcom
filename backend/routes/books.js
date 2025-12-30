const express= require(`express`)
const router = express.Router()
const { uploadpdf,
        delpdf,
        getallpdf,
        getuserpdf,
        getAllUsers,
        deluser

 }=require(`../controllers/bookcontrollers`)
const auth=require(`../middlewares/auth`)
const checkRole = require("../middlewares/roleCheck")
const { uploadBoth } = require("../config/cloudinary")

router.post(`/upload`,auth, checkRole("seller"),uploadBoth.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 }]), uploadpdf)
router.delete(`/del/:id`,auth, delpdf)
router.get(`/all`,auth, getallpdf)
router.get(`/user`,auth,getuserpdf)
router.get(`/users`,auth,getAllUsers)
router.delete(`/deluser/:id`,auth,deluser)


module.exports=router
