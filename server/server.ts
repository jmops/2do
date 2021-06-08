'use strict'
import express, { request } from 'express';
import {Request, Response} from 'express'
import {appConst} from './const'
import * as taskModel from './db/task'
import errorHandler from './errorHandler'
import dbInit from './db/db'
const app =  express();

dbInit().then(() =>{
    console.log('Database connected')
}).catch((rej) =>{
    console.log('error connecting to database: ' + rej)
})


app.listen(appConst.LISTENINGPORT , () => {
  console.log(`Listening on port ${appConst.LISTENINGPORT} ...`)
})


/**************************************************************************
 * Middleware 
 *************************************************************************/
app.use(express.json()); // Parse json

app.use((req : Request, res : Response, next : Function ) => {
  console.log(req.method)
  if( req.method === 'POST' && req.get('Content-type') !== 'application/json'  ){ // invalid content type for POST requests
    res.status(appConst.HTTPCODE.NOTACCEPTABLE).end()
  }
  
  next() // continue to endpoint
})


/**************************************************************************
 * Endpoints
 *************************************************************************/
app.get('/', (req : Request , res : Response) => {
  res.send('Hello World!')
})


app.post('/new-task', (req : Request, res : Response) =>{
  try{
    console.log(JSON.stringify(req.body))
      taskModel.insertNewTask(req.body.task).then(() =>{
        res.status(appConst.HTTPCODE.OK).send('okidoki')
      }
      ).catch((rej) =>{
        console.log(rej)
        res.status(appConst.HTTPCODE.INTERNALSERVERERROR).end()     
      })
  } catch (e){
    console.log(e.message)
    errorHandler(e.message, e.name)
    res.status(appConst.HTTPCODE.BADREQUEST).end()
  }
})