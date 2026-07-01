import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = process.env.SUPABASE_URI ;

if (!connectionString) {
    throw new Error("DATABASE_URL is missing.");
}

const sql = postgres(connectionString!)


export default sql ; 