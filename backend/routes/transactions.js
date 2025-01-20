const express = require("express");
const authMiddleware = require("../middlewares/auth_middleware");
const TransactionsController = require("../controllers/transactions_controller");
const TransactionValidators = require("../validators/transaction_validator");
const router = express.Router();

router.use(authMiddleware);

router.get("/", TransactionsController.getAll);

router.post(
  "/",
  TransactionValidators.create,
  TransactionsController.create
);

module.exports = router;
