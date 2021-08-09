/**
 * /tasks route.
 */

import express from 'express';
import { apiCcontroller } from '../controller/APIController';
import { middleware } from '../middleware/middleware';
var tasksRouter = express.Router()

tasksRouter.post('/new-task',middleware.isAuthenticated, apiCcontroller.tasks.POST.newTask)
tasksRouter.post('/complete-task', middleware.isAuthenticated, apiCcontroller.tasks.POST.completeTask)
tasksRouter.get('/get-tasks', middleware.isAuthenticated, apiCcontroller.tasks.GET.getTasks)




  export default tasksRouter