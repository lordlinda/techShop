//i will use mongoose
const mongoose =require('mongoose')

const UserSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true //unique email for every user
	},
	password:String,
	avatar:{ //user image
		type:String
	},
	role:{ //role of user it will be (normal or admin)
		type:Number,
		default:0
	},
	history:{//order history
     type:Array,
     default:[]
	}
})


module.exports = mongoose.model('User',UserSchema)