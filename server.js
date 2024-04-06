const express = require('express');
const morgan = require('morgan');
const colors = require('colors')
const dotenv = require('dotenv');
const connectDB = require('./Config/db')

dotenv.config();

const app = express();

connectDB();

app.use(express.json())
app.use((morgan('dev')))



app.use('/api/v1/user',require('./Routes/userRoutes'));
app.get('/signup', ()=>{
    console.log(' ');
});
app.get('/login',()=>{
    console.log("login");
})
const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`Server running on port ${process.env.PORT} in ${process.env.MODE} mode`)
})