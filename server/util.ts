import {appConst} from './const'
import { TaskModel, Task } from './db/task'
import bcrypt from 'bcrypt'
import { User, UserModel } from './db/users'
import { db } from './db/db'

export let util = {
    userLogin : function(name : string, password : string) : Promise<boolean>{
        return new Promise((resolve, reject)=>{
            db.authorizeUser(name, password)
            resolve(true)
            reject(false)
        })
    },

    /**
     * Hash the given password.
     * @param password 
     * @return Promise
     */
    hashPassword : function(password : string) : Promise<string>{
        return new Promise((resolve, reject)=>{
            bcrypt.hash(password, appConst.BCRYPTSALTRPOUNDS, (err : Error | undefined, hash : string) =>{
                if(err){
                    reject()
                }
                else{
                    resolve(hash)
                }
            })
        })
    },
    /**
     * Create a new user.
     * @return Promise
     */
    createNewUser : function(username : string, password : string) : Promise<boolean>{
        return new Promise(async (resolve, reject) =>{ 
            try{
                if(await db.findUser(username) === null){ // The username is unique
                    let hashedPassword : string = await this.hashPassword(password)
                    let user : User = {
                        name : username,
                        password : hashedPassword,
                        tasksDone : 0,
                        trackingStarted : new Date()
                    }
                    await db.insertNewUser(user)
                    resolve(true)
                }
                else{
                    reject('User already exists')
                }
            }catch(e){
                reject()
            }
        })
    },
    /**
     * Update appConst.RANDPMSECRET to be a random string.
     */
    createNewRandomSecret : function() {
        appConst.RANDOMSECRET = this.createRandomString(appConst.LENGTHOFRANDOMSECRETSTRING);

    },
    /**
     * Create a random string.
     * @param length the length of the new random string
     * @return string
     */
    createRandomString : function(length : number){
        let randomString = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for(let i = 0; i < length; i++){
            randomString += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return randomString
    }

}