'use strict'
import express from 'express';
import {Request, Response} from 'express'
import {appConst} from './const'
import errorHandler from './errorHandler'
import {db} from './db/db'
//import cookieParser from 'cookie-parser'
import tasksRouter from './routes/tasks'
import profileRouter from './routes/profile'

import session from 'express-session'
import {default as connectMongoDBSession} from 'connect-mongodb-session'
import { util } from './util';
const mongoStore = connectMongoDBSession(session)
const app =  express();

const store = new mongoStore({
  uri : appConst.DATABASEURI,
  collection : 'sessions'
})

util.createNewRandomSecret()

db.dbInit().then(() =>{ // Make sure the database is connected before processing requests


    app.listen(appConst.LISTENINGPORT , () => {
      console.log(`Listening on port ${appConst.LISTENINGPORT} ...`)
    })
    
    
    app.use(express.json()); // Parse json
    
    app.use((req : Request, res : Response, next : Function ) => {
      console.log(req.method)
      if( req.method === 'POST' && req.get('Content-type') !== 'application/json'  ){ // invalid content type for POST requests
        res.status(appConst.HTTPCODE.NOTACCEPTABLE).end()
      }else{
        next() // continue to endpoint
      }
      
    })
    


    app.use(session({
      secret : appConst.RANDOMSECRET,
      resave : false,
      saveUninitialized : false,
      store : store
    }))

    /**************************************************************************
     * Endpoints
     *************************************************************************/
    app.use('/tasks', tasksRouter)
    app.use('/profile', profileRouter)

}).catch((rej) =>{
    console.log('error connecting to database: ' + rej)
    process.exit(1); 
})




