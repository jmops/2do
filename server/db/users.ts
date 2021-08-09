import mongoose from 'mongoose';


export interface User {
    name: string;
    password: string;
    tasksDone: number;
    trackingStarted: Date;
};

var schema = new mongoose.Schema<User> ({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tasksDone : {
        type : Number,
        required : true
    },
    trackingStarted : {
        type : Date,
        required : true
    }
})


export const UserModel = mongoose.model<User>('User', schema)