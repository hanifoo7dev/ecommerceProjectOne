const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {varificationEmail} = require('../utils/emailSender')




const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// requires for password: 1 lowercase, 1 uppercase, 1 digit, 1 special char, min 8 chars
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// make register controller
let registrationController = async(req ,res)=>{
let {fullName, email,password,confarmpassword,terms} = req.body
// check database
let existinguser = await User.findOne({email: email})
if(existinguser){
   return res.status(400).json({
        success: false,
        message: "User already exits"
    }) 
}

// cheacking
if(!fullName || !email || !password || !confarmpassword || !terms){
    return res.status(400).json({
        success: false,
        message: "Please fill all the fileds"
    })
}

// validate password and confarmpassword
if(password !== confarmpassword){
    return res.status(400).json({
        success: false,
        message: "password donot match"
    })
}
// validate email
if(!emailRegex.test(email)){
    return res.status(400).json({
        success: false,
        message: "please enter a valid email"
    })
}
// validate password
if(!strongPasswordPattern.test(password)){
    return res.status(400).json({
        success: false,
        message: "please enter a valid password"
    })
}
//  password bycript
const hash = bcrypt.hashSync(password, 10);

// Schema validation
let user = new User({
  fullName: fullName,
  email: email,
  password: hash,
  terms: terms  
})
//  save in database
await user.save()
// send mail by jwt token make
let token = jwt.sign({
    _id:user._id,
    email: user.email,
    role: user.role
},process.env.JWT_VERIFY_SECRET,{expiresIn: "7d"} );
// to see token create or not 
// console.log(token)
varificationEmail(email,token)

return res.status(201).json({
    success: true,
    message: "registration done"
  })
}

// make logiinController
let loginController = async(req,res)=>{
    let {email, password}= req.body
    // validate existinguser in database
    let existinguseer = await User.findOne({email: email})
    if(!existinguseer){
       return res.status(400).json({
        success: false,
        message: "Invalid credencial"
    }) 
   }
  if(!email || !password ){
    return res.status(400).json({
        success: false,
        message: "Please fill all the fileds"
    })
}
// validate email
if(!emailRegex.test(email)){
    return res.status(400).json({
        success: false,
        message: "please enter a valid email"
    })
}
// validate password with  token  by bcrypt
let passCompare = bcrypt.compareSync(password,existinguseer.password ); 
if(passCompare){
    res.status(200).json({
            success: true, 
            messagge: "Login successfully",
            data: {
                _id: existinguseer._id,
                fullname: existinguseer.fullname,
                email: existinguseer.email,
                role: existinguseer.role
            }
        })
}else{
     return res.status(400).json({
            success: false, 
            messagge: "Invalif cradential"
        })
}
}

// verify emailController
let verifyEmailController = async (req,res)=>{
let {token}= req.params
const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
// console.log(decoded)
// we need to update isVarified  false to true 
await User.findByIdAndUpdate({_id: decoded._id},{isVarified: true})
return res.status(200).json({
    success: true,
    message: "Email Verified"
  })
}


 
    


module.exports ={registrationController,loginController,verifyEmailController }