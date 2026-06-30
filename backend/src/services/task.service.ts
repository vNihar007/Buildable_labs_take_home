import taskRepo from "../repositories/task.repo.js";
import type { CreateTaskDto } from "../schemas/task.schema.js";

class TaskService {
    async createTask(payload: CreateTaskDto) {
        return taskRepo.create(payload);
    }
}

export default new TaskService();

