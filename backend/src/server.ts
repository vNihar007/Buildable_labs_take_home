import dotenv from 'dotenv' ;
import sql from './config/supabase.js';

dotenv.config() ;

// app and port 

import app from '../src/app.js' ;
import logger from '../src/config/logger.js'

const port = process.env.PORT || 3000 ;

app.listen(port , () => {
    logger.info(`Server running on port ${port}`) ;
})

app.listen(port, async () => {
    await sql`SELECT 1`;
    logger.info(`Supabase connected`);
});

