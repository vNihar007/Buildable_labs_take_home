import taskRepo from "../repositories/task.repo.js";
import type { CreateTaskDto } from "../schemas/task.schema.js";
import type { GetTasksQueryDto } from "../schemas/query.schema.js";
import ApiError from "../utils/ApiErorr.js";

class TaskService {
    async createTask(payload: CreateTaskDto) {
        return taskRepo.create(payload);
    }
    async getTasks(query: GetTasksQueryDto){
        return taskRepo.findAll(query);
    }
    async getTaksById(id:string){
        const task = await taskRepo.findById(id);
        if(!task){
            throw new ApiError(404,"Task not found") 
        }
        return task ; 
    }
    async updateTask(id:string, payload: Partial<CreateTaskDto>) {
        const task = await taskRepo.update(id,payload) ;
        if(!task){
            throw new ApiError(404,"Task not found") 
        }
        return task ;
    }
    async deleteTask(id:string){
        const task = await taskRepo.softdelete(id);
        if(!task){
            throw new ApiError(404,"Task not found") 
        }
        return task ;
    }
}

export default new TaskService();

