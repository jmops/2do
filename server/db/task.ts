import mongoose from 'mongoose';


export interface Task {
    todo: string;
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

export const TaskModel = mongoose.model<Task>('Task', schema)
