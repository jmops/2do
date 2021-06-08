import mongoose from 'mongoose'
/**
 * Connect to the database
 * @returns Promise
 */
export default function dbInit() : Promise<boolean>{
    return new Promise((resolve, reject) =>{
        mongoose.connect('mongodb://localhost:27017/2do', 
        {   useNewUrlParser : true,
            useUnifiedTopology : true
    }).then(()=>{
            resolve(true)
        }).catch((rej) =>{
            reject(rej)
        })
    })
}