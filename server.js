const express=require('express')
const morgan=require('morgan')
const cors=require('cors')

const app=express()
require('dotenv').config()

//Mongodb
const connectDB=require('./db.js')
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//morgan gives info about each request
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/api/user',require('./routes/authroute'))
app.use('/api/category',require('./routes/category.js'))

//Page not found
app.use((req,res)=>{
	res.status(404).json({
		msg:'Page not found'
	})
})

const PORT =process.env.PORT ||5000
app.listen(PORT,()=>{
	console.log(`app is listening on port ${PORT}`)
})