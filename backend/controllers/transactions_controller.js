const { validationResult } = require("express-validator");
const prisma = require("../config/prisma");

const TransactionsController = {
  getAll: async (req, res) => {
    try {
      const reqUserId = req.userId

      const transactions = await prisma.transaction.findMany({
              where: {
                userId: reqUserId,
              },
              orderBy: {
                date: "desc",
              },
              include: {
                category: true,
              },
            });
      return res.status(200).json(transactions)
    } 
    catch (error) {
      console.error("Error fetching transactions:", error.message)
      return res.status(500).json({ error: "An error occurred while fetching transactions" })
    }
  },
  create: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const categoryId = req.body.categoryId || req.params.categoryId || req.query.categoryId
      const type = req.body.type || req.params.type || req.query.type
      const amount = req.body.amount || req.params.amount || req.query.amount
      const description = req.body.description || req.params.description || req.query.description
      const date = req.body.date || req.params.date || req.query.date
 
      if (!categoryId) {
        return res.status(400).json({ error: "No ID provided" })
      }

      const reqUserId = req.userId

      const category = await prisma.category.findUnique({
              where: {
                id: Number.parseInt(categoryId),
              },
            });
      const createdTransaction = await prisma.transaction.create({
          data: {
            type,
            amount,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            description,
            date: date !== "" ? new Date(date) : undefined,
            category: {
              connect: {
                id: category.id,
              },
            },
            user: {
              connect: {
                id: reqUserId,
              },
            },
          },
        });
        return res.status(200).json(createdTransaction)
    } 
    catch (error) {
      console.error("Error creating transaction:", error.message)
  
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Category not found" })
      }
  
      return res.status(500).json({ error: "An error occurred while creating the transaction" })
    }
  },
};

module.exports = TransactionsController;
