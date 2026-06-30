import type { Request, Response } from 'express';
import taskService from '../services/task.service.js';

class TaskController{
    async create(req:Request,res:Response){
        const task  = await taskService.createTask(req.body) ;
        return res.status(201).json({
            success:true, 
            data:task
        })
    }
}

export default new TaskController() ; 
