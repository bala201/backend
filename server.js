const express= require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
var cors=require('cors');

const EmployeeRoute =   require('./routes/employee')
const AuthRoute =   require('./routes/auth')

mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database  connection established!')
})

const app= express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('Server is running on port ${PORT}')
})

app.options('*',cors());
app.use(cors());

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)