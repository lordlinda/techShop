const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
	const token =req.header('x-auth-token');
	//check if no token
	if(!token){
		return res.status(401).json({
			msg:'no token.auth denied'
		})
	}
	try{
		//verify token
	const decoded=jwt.verify(token,process.env.JWT_SECRET)
	//set user id to req.user
	req.user=decoded.user
	next()

	}catch(error){
       res.status(401).json({
       	msg:'token not valid'
       })
	}
	
}

