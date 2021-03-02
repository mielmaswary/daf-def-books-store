const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true

})

const userSchema= new mongoose.Schema({
    name:{
       type:String
    },
    age:{
       type: Number
    }
})


const User=mongoose.model('user',userSchema);
