const express = require("express");
const authMiddleware = require("../middlewares/auth_middleware");
const CategoriesController = require("../controllers/categories_controller");
const CategoryValidators = require("../validators/category_validator");
const router = express.Router();

router.use(authMiddleware)

router.get("/",CategoriesController.getAll)

router.delete("/:id",CategoryValidators.delete,CategoriesController.delete)

module.exports = router;
