import mongoose from "mongoose";


export function connectDB(){

    if(mongoose.connection.readyState > 0){
        return;
    }

    mongoose
    .connect('mongodb://127.0.0.1:27017')
    .then(() => {
        console.log(`Mongo DB Connected `);
    })
    .catch((err) => {
        console.log(`Mongo DB Not Connected `,(err || '').toString());
    })

}