const express=require('express')
const router =express.Router()
const jwt=require('jsonwebtoken') //to generate token
const bcrypt=require('bcryptjs') //to encrypt password

//check validation requests
const {check,validationResult}=require('express-validator')
const gravatar =require('gravatar')//get user image by email
const auth =require('../middleware/auth.js')
//Models
const User=require('../models/User.js')

//@route api/user
//@desc  User information
//@access Private
router.get('/',auth,async(req,res)=>{
	try{
		const user= await User.findById(req.user.id).select('-password')
		res.json(user)

	}catch(error){
     console.log(err.message)
     res.status(500).send('Server Error')
	}
})

//@route api/user/register
//@desc  Register user
//@access Public
router.post('/register',[
	check('name','Name is required').not().isEmpty(),
	check('email','Please include a valid email').isEmail().not(),
	check('password','Please enter a password with 6 or more characters').isLength({
		min:6
	})
	],async(req,res)=>{
		//get name and email and password from the request
		const {name,email,password}=req.body

		  const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(422).json({
				errors:errors.array()
			})
		}
		try{
			//Check if user already exists
			let user=await User.findOne({email})
			//if user exist
			if(user){
				return res.status(400).json({
					errors:[
					{
						msg:'User already exists'
					},
					]
				})
			}
			//if not exists
			//get image from gravatar
			const avatar =gravatar.url(email,{
				s:'200',//size
				r :'pg',//Rate
				d:'mm'
			})
			//create user object
			user= new User({
				name,email,avatar,password
			})

			//encrypt password
			const salt =await bcrypt.genSalt(10) //generate salt conatins 10
			//save password
			user.password=await bcrypt.hash(password,salt)//use user password and salt to hash password
 			//save user to the database
			await user.save()
           
			//payload to generate token
			const payload={
				user:{
					id:user.id
				}
			}
			jwt.sign(
				payload,
				process.env.JWT_SECRET,{
					expiresIn:3600
				},(err,token)=>{
					if(err) throw err
						res.json({token})
				}

				)

		}catch(error){
			console.log(error.message)
			res.status(500).send('server error')
		}
	})

//@route api/user/login
//@desc  Register user
//@access Public
router.post('/login',[
	check('email','please include a valid email').isEmail(),
	check('password','password is required').exists()
],async(req,res)=>{

	//if error
	 const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(400).json({
				error:'error'
			})
		}
		try{
			//if everything is good
		//get email and password from request.body
		const {email,password}=req.body
		let user = await User.findOne({
			email
		})
		//if user not found in the database
		if(!user){
			return res.status(400).json({
			errors:[{
				msg:'Invalid credentials'
			}]
		})
		}
		//console.log(user)
		//Know user found by email lets  compare passwords
		const isMatch = await bcrypt.compare(password,user.password)
		//passwords dont match
		if(!isMatch){
			return res.status(400).json({
				errors:[
				{
					msg:'Inavlid credentials  '
				}]
			})
		}
		//paylaod token
		const payload={
				user:{
					id:user.id
				}
			}
			jwt.sign(
				payload,
				process.env.JWT_SECRET,{
					expiresIn:3600
				},(err,token)=>{
					if(err) throw err
						res.json({token})
				}

				)

		}catch(error){
         console.log(error.message)
			res.status(500).send('server error')
		}
})
module.exports =router