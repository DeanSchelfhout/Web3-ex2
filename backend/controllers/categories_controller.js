const { validationResult } = require("express-validator")
const prisma = require("../config/prisma")

const CategoriesController = {
  getAll: async (req, res) => {
    try {
      const reqUserId = req.userId
      const categories = await prisma.category.findMany({
        where: {
          userId: reqUserId,
        },
      });
      return res.status(200).json(categories)
    }
    catch (error) {
      console.error("Error fetching categories:", error.message)
      return res.status(500).json({ error: "An error occurred while fetching categories" })
    }
  },
  delete: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
  
      const id = req.body.id || req.params.id || req.query.id

      if (!id) {
        return res.status(400).json({ error: "No ID provided" })
      }

      await prisma.category.delete({
        where: {
          id: Number.parseInt(id),
        },
      })
  
      return res.status(200).json({ message: `Category with ID ${id} deleted successfully` })
    } 
    catch (error) {
      console.error("Error deleting category:", error.message)
  
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Category not found" })
      }
  
      return res.status(500).json({ error: "An error occurred while deleting the category" })
    }
  },
};

module.exports = CategoriesController;
