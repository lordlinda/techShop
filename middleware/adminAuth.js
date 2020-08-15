
const User=require('../models/User.js')

module.exports = async(req,res,next)=>{
	try{
		//Get user info by id
		const user =await User.findOne({
			_id:req.user.id
		})
		if(user.role === 0){
			return res.status(403).json({
				error:'Admin resources access denied'
			})
		}

      next()
	}catch(err){
		console.log(err)
    res.status(500).send('Server error here')
	}


}