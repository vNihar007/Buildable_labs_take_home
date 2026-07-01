import type { Request, Response } from 'express';
import taskService from '../services/task.service.js';
import { success } from 'zod';


class TaskController{
    async create(req:Request,res:Response){
        const task  = await taskService.createTask(req.body) ;
        return res.status(201).json({
            success:true, 
            data:task
        })
    };

    async getAll(req: Request, res: Response) {
    const tasks = await taskService.getTasks();

    return res.status(200).json({
        success: true,
        data: tasks,
    });
    }

    async getById(req:Request,res:Response){
    const {id} = req.params ;
    const task = await taskService.getTaksById(id as string) ;
    return res.status(200).json({
        success: true,
        data: task
    })
    } ;
    async update(req:Request,res:Response){
        const id:string = req.params.id as string
        const task = await taskService.updateTask(id,req.body)
        return res.status(200).json({
            success:true,
            data:task
        })
    } ;

    async delete(req:Request,res:Response){
        const id:string = req.params.id as string
        const task = await taskService.deleteTask(id)
        return res.status(200).json({
            success:true,
            data:task
        })
    }

}


export default new TaskController() ; 


