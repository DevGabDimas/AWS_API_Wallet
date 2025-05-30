import express from "express";
import { sql } from "../config/db.js";
import {createTransaction, deleteTransaction, getSummaryById, getTransactionsByUserId} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:user_id", getTransactionsByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummaryById);

export default router;