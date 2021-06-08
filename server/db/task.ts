import mongoose from 'mongoose';


interface Task {
    task: string;
    isCompleted: boolean;
    dateAdded: Date;
    dateCompleted?: Date;
};

var schema = new mongoose.Schema<Task> ({
    todo :{ 
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        required : true
    },
    dateAdded : {
        type : Date,
        required : true
    },
    dateCompleted : {
        type : Date
    }
})

const TaskModel = mongoose.model<Task>('Task', schema)


/**
 * Insert a new document based on the Task model.
 * Throws an exception if the insert fails.  
 * @param task the new task
 * @return Promise
 */
export function insertNewTask(task : string) : Promise<boolean>{
    return new Promise((resolve,reject) =>{

    const newTask = new TaskModel({
        todo : task,
        isCompleted : false,
        dateAdded : new Date() 
    })
    newTask.save((err) =>{
        if (err) reject(`error inserting new task: ${task}\nError: ${err.message}`)
        else resolve(true);
    })
    })
}