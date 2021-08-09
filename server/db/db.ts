import mongoose from 'mongoose'
import {appConst} from '../const'
import { TaskModel, Task } from './task'
import bcrypt from 'bcrypt'
import { User, UserModel } from './users'
import { util } from '../util'




export let db = {
    /**
    * Initialize the database
    * @returns Promise
    */
    dbInit : function() : Promise<boolean> {
        return new Promise((resolve, reject) =>{
            mongoose.connect(appConst.DATABASEURI, 
            {   useNewUrlParser : true,
                useUnifiedTopology : true,
                useFindAndModify : false
        }).then(()=>{
            console.log('Database connected')
                resolve(true)
            }).catch((rej) =>{
                reject(rej)
            })
        })
    },
    insertNewUser : function(user : User) : Promise<boolean> {
        const newUser = new UserModel({
            name : user.name,
            password : user.password,
            tasksDone : user.tasksDone,
            trackingStarted : user.trackingStarted
        })
        return new Promise((resolve, reject)=>{
            newUser.save((err) =>{
                if(err){
                    console.log(err)
                        reject(err)
                }
                else{
                    resolve(true)
                }
            })
        })
    },
    /**
 * Insert a new document based on the Task model.
 * Throws an exception / rejection if the insert fails.  
 * @param task the new task
 * @return Promise
 */
    insertNewTask : function(task : string) : Promise<boolean>{
        return new Promise((resolve,reject) =>{
            const newTask = new TaskModel({
                todo : task,
                isCompleted : false,
                dateAdded : new Date() 
            })
            newTask.save((err : mongoose.CallbackError | null) =>{ 
                if (err) reject(appConst.HTTPCODE.INTERNALSERVERERROR)
                else resolve(true);
            })
        })
    },
    /**
     * Retrieve all the tasks.
     * @return Tasks as a promise  
     */
    retrieveTasks : function() : Promise<Task[]> {
        return new Promise((resolve, reject) =>{
            TaskModel.find((err, tasks) =>{
                if(err) reject(err)
                else{
                    resolve(tasks)
                }
            })
        })
    },
    /**
     * 
     * @param taskid task id
     * @return bool based on the success of the document update
     */
    completeTask : function(taskid : string) : Promise<boolean>{
        return new Promise((resolve, reject) =>{
                TaskModel.findByIdAndUpdate(taskid, {
                    isCompleted : true,
                     dateCompleted : new Date()
                    }, {new : true}, 
                    (err : mongoose.CallbackError | null, doc : Task | null) =>{
                        console.log(JSON.stringify(err))
                        if(err) reject(appConst.HTTPCODE.INTERNALSERVERERROR)
                        else if(!doc) reject(appConst.HTTPCODE.BADREQUEST)
                        else{
                            resolve(true)
                        }
                    })

        })
    },
    authorizeUser : function(name : string, password : string) : Promise<boolean>{
        return new Promise(async (resolve, reject) =>{
            try{
                let user : User | null  = this.findUser(name)
                if(user){
                    this.checkPassword(password, user)
                }
                //let hashedPassword : string = util.hashPassword(password)
            }catch(e){
                
            }
        })
    },
    /**
     * See if a user exist.
     * @param nameToCheck 
     * @return promise, the found user or null.
     */
    findUser : function(nameToCheck : string) : Promise<User | null>{
        return new Promise((resolve, reject) =>{
            UserModel.findOne({name : nameToCheck}, (err : mongoose.CallbackError | null, doc : User | null) =>{
                if(err) reject()
                resolve(doc)
            })
        })
        


       /* return new Promise((resolve, reject) =>{
            /*UserModel.findOne({name : nameToCheck}, (err, doc) =>{
                if(err) reject(err)
                resolve(doc)
            })
        }) */
    },
    /**
     * Check to see if a password and the stored password of a user is a match. 
     * @param password the password in question
     * @param user The user whose password we want to check against.
     */
    checkPassword : async function(password : string, user : User) : Promise<boolean>{
        try{
            if(await bcrypt.compare(password, user.password)){
                return true
            }
            return false
        } catch(e){
            return false
        }
    }
    

}