import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    date:{
        type:Date
    },
    message:{
        type:String
    },
    reminderType:{
        type:String,
        enum:["email","sms"],
        required:true
    }

}, { timestamps: true });

export const Reminder = mongoose.model("Reminder",reminderSchema)