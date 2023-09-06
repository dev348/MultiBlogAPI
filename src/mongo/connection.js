import mongoose from "mongoose";

export function connectDB() {
    if (mongoose.connection.readyState > 0) {
        return;
    }

    mongoose
        .connect('mongodb+srv://multiblog:77qRt3RsloeHQJ26@cluster0.b0gtslp.mongodb.net/multiblogs')
        .then(() => {
            console.log(`Mongo DB Connected `);
        })
        .catch((err) => {
            console.log(`Mongo DB Not Connected `, (err || '').toString());
        })

}