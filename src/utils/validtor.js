const validator=require('validator')

const isEmail=(email)=>{
   return validator.isEmail(email)
}

module.exports=isEmail