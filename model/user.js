const mongo=require('mongoose')
const schema=mongo.Schema
const User=new schema({
    username:{ type: String, required: true },
    email:{ type: String, required: true },
    cin:{ type: Number, required: true },
    password:{ type: String, required: true },
    phone:Number,
    //role:{type:String,default:"user"},
})
module.exports=mongo.model('user',User)