// require('dotenv').config();
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import app from './app.js';

dotenv.config(
    { path: "./.env" }  // path to your .env file
);


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`SERVER RUNNING ON PORT:${process.env.PORT || 8000}`)
    })
})
.catch(err => console.log("CONNECTION ERROR",err));