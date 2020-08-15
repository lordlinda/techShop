const express=require('express')
const router =express.Router()

//Models
const Category = require('../models/Category.js')
//auth middleware for verifying if a user is signed in or logged in
const auth =require('../middleware/auth')
const authAdmin=require('../middleware/adminAuth')

const {check,validationResult}=require('express-validator')

//@route POST api/category
//@desc  create category
//@access Private Admin
router.post('/',[
	check('name','name is required').trim().not().isEmpty()
	],auth,authAdmin,async(req,res)=>{
		  const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(422).json({
				errors:errors.array()
			})
		}
		const {name}=req.body
		try{
			let category =await Category.findOne({
				name
			})
			if(category){
				return  res.status(403).json({
					error:'Category already exists'
				})
			}

			const newCategory = new Category({
				name
			})
			category =await newCategory.save()
			res.json(category)

		}catch(err){
			console.log(error)
			res.status(500).send('Server error')

		}
	})

router.get('/all',async(req,res)=>{
	try{
     let data = await Category.find({})
     res.json(data)
	}catch(err){
     console.log(err)
    res.status(500).send('Server error')

	}
})

module.exports =router
