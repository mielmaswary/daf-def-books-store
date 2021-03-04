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
    email:{
        type: String
    },
    password:{
       type: String
    }
})

const User=mongoose.model('user',userSchema);


const bookSchema= new mongoose.Schema({
    bookName:{
       type:String
    },
    authorName:{
        type:String
    },
    genres:{
        type: String
    },
    pagesNum:{
        type:Number
    },
    imageUrl:{
        type:String
    },
    price:{
        type:Number
    },
    recommended:{
       type: Boolean,
       default:false

    },
    sale:{
        type:Boolean,
        default:false
    }
})

const Book=mongoose.model('book',bookSchema);
module.exports= Book

