import {neon} from '@neondatabase/serverless';

import "dotenv/config";

// Cria uma conexão SQL usando a URL do banco de dados
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions (
                    id SERIAL PRIMARY KEY,
                    user_id VARCHAR(255) NOT NULL, 
                    title VARCHAR(255) NOT NULL,
                    amount DECIMAL(10,2) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    created_at DATE NOT NULL DEFAULT CURRENT_DATE
                )`;

            console.log("Banco de dados inicializado com sucesso");
    } catch (error) {
        console.log("Erro ao inicializar o banco de dados:", error);
        process.exit(1); 
    }
}