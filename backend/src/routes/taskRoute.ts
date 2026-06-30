import { Router } from "express";

import taskController from "../controllers/task.controller.js";
import { validate } from "../middleware/validate.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post('/',validate(createTaskSchema),asyncHandler(taskController.create))

export default router ; 