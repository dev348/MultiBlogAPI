import { app } from "./app.js";

const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    console.log(`API is Running on Port: ${port}`)
});

process.on('SIGTERM', () => {
    server.close(() => { })
})