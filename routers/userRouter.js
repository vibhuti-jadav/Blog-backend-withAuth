import express from "express"
import userController from "../controller/userController.js"


const router = express.Router()

router.post("/add",userController.addUser)

router.get("/all",userController.allUser)

router.get("/:id",userController.specificUser)
router.patch("/:id",userController.updateUser)

router.delete("/:id",userController.deleteUser)

export default router