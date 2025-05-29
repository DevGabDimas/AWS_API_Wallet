import express from 'express';
import dotenv from 'dotenv';
import {initDB} from "./config/db.js"
import { limiter } from './config/upstash.js';
import transactionRoutes from './routes/transactionsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(limiter);

app.use("/api/transactions", transactionRoutes);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port ",PORT);
    });
});

