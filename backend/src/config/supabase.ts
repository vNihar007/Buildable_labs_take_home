import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = process.env.SUPABASE_URI! ;
const sql = postgres(connectionString!)


export default sql ; 