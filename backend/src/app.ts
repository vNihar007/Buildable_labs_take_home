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
import taskRoute from './routes/taskRoute.js';
app.use('/tasks' ,taskRoute) ;
import { notFound } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/error.js';
app.use(notFound);
app.use(errorHandler);

export default app; 
