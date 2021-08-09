import {Request, Response} from 'express'
import {appConst} from '../const'
import {util} from '../util'
import {db} from '../db/db'

export const apiCcontroller = {
    /**
     * /handle endpoints in the '/profile' path.
     */
    profile : {
        /**
         * Handle POST requests for the /profile path
         */
        POST : {
            /**
             * Handle the endpoint for '/profile/new-user' endpoint.
             * @param req 
             * @param res 
             */
            newUser : function(req : Request, res : Response){
                if(typeof req.body.name === 'string' && typeof req.body.password === 'string'){
                    util.createNewUser(req.body.name, req.body.password).then((resolve) =>{
                      res.status(appConst.HTTPCODE.OK).redirect('/login')
                    }).catch((rej) =>{
                        console.log(rej)
                        if(rej){
                            res.status(appConst.HTTPCODE.BADREQUEST).send(rej)
                        }else{
                            res.status(appConst.HTTPCODE.INTERNALSERVERERROR).end()
                        }
                    })
                }
                else{
                    res.status(appConst.HTTPCODE.BADREQUEST).end()
                }
            },
            /**
             * Handle the endpoint for '/profile/login' endpoint.
             * @param req 
             * @param res 
             */
            login : function(req : Request, res : Response){
                /*if(typeof req.body.name === 'string' && typeof req.body.password === 'string'){
                    util.authorizeUser(req.body.name, req.body.password).then((res) =>{
                      
                    })
                  }*/
                  //req.session.authenticated = true
            }
        },
        /**
         * Handle GET requests for the /profile path
         */
        GET : {

        }
    },
        /**
     * /handle endpoints in the '/tasks' path.
     */
    tasks : {
        /**
         * Handle POST requests for the /tasks path.
         */
        POST : {
            newTask : function(req : Request, res : Response){
                if(typeof req.body.task === 'string'){
                    db.insertNewTask(req.body.task).then(() =>{
                      res.status(appConst.HTTPCODE.OK).end()
                    }
                    ).catch((rej) =>{ 
                      console.log(rej)
                      res.status(appConst.HTTPCODE.INTERNALSERVERERROR).end()     
                    })  
                  }
                  else{
                    res.status(appConst.HTTPCODE.BADREQUEST).end()
                  }
            },
            completeTask : function(req : Request, res : Response){
                    if(typeof req.body.taskid === 'string'){
                      /*  try{
                            await db.completeTask(req.body.taskid)
                            res.status(appConst.HTTPCODE.OK).end()
                        }catch(e){
                            console.log(e)
                            res.status(401).end()
                        } */
                        db.completeTask(req.body.taskid).then((resolve) =>{
                            res.status(appConst.HTTPCODE.OK).end()
                        }).catch((rej) =>{
                            res.status(appConst.HTTPCODE.BADREQUEST).end()
                        })
                    }
                    else{
                        res.status(appConst.HTTPCODE.BADREQUEST).end()
                    }
            }

        }, 
        /**
         * Handle GET requests for the /tasks path. .
         */
        GET : {
            getTasks : function(req : Request, res : Response){
                db.retrieveTasks().then((resolve) =>{
                    //console.log(JSON.stringify(resolve))
                    res.status(appConst.HTTPCODE.OK).json(resolve)
                  }).catch((rej) =>{
                    console.log(rej)
                    res.status(appConst.HTTPCODE.INTERNALSERVERERROR).end()
                  })
            }
        }
    }
}