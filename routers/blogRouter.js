import express from "express"
import blogController from "../controller/blogController.js"

const router = express.Router()

router.post("/add",blogController.addBlog)

router.get("/all",blogController.allblog)

router.get("/:id",blogController.specificBlog)

router.patch("/:id",blogController.updateBlog)
router.delete("/:id",blogController.deleteBlog)

export default router