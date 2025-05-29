import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
    
    try {
        const {user_id} = req.params;
    
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC;
            `
    
            res.status(200).json(transactions);
    } catch (error) {
        console.log("Erro ao buscar transações:", error);
        return res.status(500).json({message : "Erro no Servidor"});
    }
};
export async function createTransaction(req, res) {
    try {
        const {user_id,title,amount,category} = req.body;
    
        if(!user_id ||!title || amount === undefined ||  !category  ) {
            return res.status(400).json({error: "Todos os campos são obrigatórios"});
        }
    
        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *;
        `;

        res.status(201).json(transaction[0]);
    
    } catch (error) {
        console.log("Erro ao criar transação:", error);
        return res.status(500).json({error: "Erro ao criar transação"});
    }
};
export async function deleteTransaction(req, res) {
    try {
        const {id} = req.params;

        if(isNaN(parseInt(id))) {
            return res.status(400).json({error: "ID inválido"});
        }

        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;

        if(result.length === 0) {
            return res.status(404).json({error: "Transação não encontrada"});
        }

        res.status(200).json({message: "Transação deletada com sucesso"});

    } catch (error) {
        console.log("Erro ao deletar transação:", error);
        return res.status(500).json({error: "Erro do servidor ao deletar transação"});
    }
};
export async function getSummaryById(req, res) {
     try {
        const {userId} = req.params;

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_Id = ${userId}
        `;

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount),0) as income FROM transactions
            WHERE user_id = ${userId} AND amount > 0
        `
         const expensesResult = await sql`
            SELECT COALESCE(SUM(amount),0) as expenses FROM transactions
            WHERE user_id = ${userId} AND amount < 0
        `
        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses,
        });
    } catch (error) {
        console.log("Erro ao deletar transação:", error);
        return res.status(500).json({error: "Erro do servidor ao deletar transação"});
    }
}