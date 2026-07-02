import { Router } from "express";

import taskController from "../controllers/task.controller.js";
import { validate } from "../middleware/validate.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// router.post('/',validate(createTaskSchema),asyncHandler(taskController.create))
router.post("/", (req, res, next) => {
  console.log("POST /tasks HIT");
  next();
}, validate(createTaskSchema), asyncHandler(taskController.create));
router.get('/',asyncHandler(taskController.getAll))
router.get('/:id',asyncHandler(taskController.getById))
router.patch('/:id',validate(updateTaskSchema),asyncHandler(taskController.update))
router.delete('/:id',asyncHandler(taskController.delete))
export default router ; 