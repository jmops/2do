/**
 * /tasks route.
 */

 import express, { request, response } from 'express';
 import {Request, Response} from 'express'
 import {appConst} from '../const'
 
 import errorHandler from '../errorHandler'
 import {db} from '../db/db'
 import {util} from '../util'
 import { resolve } from 'path/posix';
 import { apiCcontroller } from '../controller/APIController';
 
 
 var profileRouter = express.Router()
 
 profileRouter.post('/new-user',apiCcontroller.profile.POST.newUser)
 profileRouter.post('/login', apiCcontroller.profile.POST.login)
 profileRouter.get('logout', apiCcontroller.profile.GET.logout)
 
 

 
export default profileRouter