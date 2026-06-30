import express from 'express' ;
import cors from 'cors' ;
import helmet from 'helmet';

const app = express() ;
app.use(cors());
app.use(helmet());
app.use(express.json());


//Routes ; 
import healthRoute from './routes/health.route.js';
app.use('/health' ,healthRoute) ;



export default app; 
