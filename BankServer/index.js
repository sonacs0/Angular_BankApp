//import express

const express = require('express')

const dataService = require('./services/data.service')

// session = require('express-session')   //importing session
//import
const jwt=require("jsonwebtoken")


//create app using express

const app = express()


//use session
// app.use(session({
//     secret:'randomsecurestring',
//     resave:false,
//     saveUninitialized:false
// }))


//parse JSON
app.use(express.json())

//application specific middleware
app.use((req,res,next)=>{
console.log("Application specific middleware")
next()
})

//router specific middleware
const logMiddleware=(req,res,next)=>{
console.log(req.session)
if(!req.session.currentAcno){
    res.json({
        status:false,
        statuscode:401,
        message:"Please Log In"
    })
}
else{
    next()
}
}
//JWT middleware
const jwtmiddleware=(req,res,next)=>{
    try{
        const token = req.body.token
        //token vaidation
        const data=jwt.verify(token,'supersecretkey123456')
        req.currentAcno=data.currentAcno
        next()
    }
    catch{
        res.json({
            status:false,
            statuscode:401,
            message:"Please Log In"
        })
    }
}//token API for testing
app.post('/token',jwtmiddleware,(req,res)=>{

})
//define default router
app.get('/',(req,res)=>{
    res.status(401).send("GET METHOD")
})

app.post('/',(req,res)=>{
    res.send("POST METHOD")                 
})

app.put('/',(req,res)=>{
    res.send("PUT METHOD")                 
})

app.patch('/',(req,res)=>{
    res.send("PATCH METHOD")                 
})

app.delete('/',(req,res)=>{
    res.send("DELETE METHOD")                 
})

//set port to run application
//callback - oru function akath vere oru function 
                     //ne call cheyyunnathaan. in callback define cheyyunnath using arrow function.



//register API
app.post('/register',(req,res)=>{
    console.log(req.body);
    const result = dataService.register(req.body.acno,req.body.uname,req.body.password)
    res.status(result.statusCode).send(result)
})      


//login API
app.post('/login',(req,res)=>{
    const result = dataService.login(req.body.acno,req.body.pwd)                                    
    res.status(result.statusCode).send(result)
})   

//deposit API
app.post('/deposit',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result = dataService.deposit(req.body.acno,req.body.pwd,req.body.amt)                                    
    res.status(result.statusCode).send(result)
}) 

//withdraw API
app.post('/withdraw',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result = dataService.withdraw(req.body.acno,req.body.pwd,req.body.amt)                                    
    res.status(result.statusCode).send(result)
}) 



//transaction API
app.post('/transaction',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result = dataService.getTransaction(req.body.acno,req.body.pwd,req.body.amt)                                    
    res.status(result.statusCode).send(result)
})


app.listen(3000,()=>{
    console.log("SERVER STARTED AT PORT NUMBER 3000");
})