//impot mongoose
const mongoose=require('mongoose')
//connect btwn mongoose and server

mongoose.connect('mongodb://localhost:27017/bank',{
    useNewUrlParser:true
})

//model creation

const   User=mongoose.model('User',{
    acno:Number,
    uname:String,
    password:String,
    balance:Number,
    transactions:[]
})

//export model

module.exports={
    User
}