const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true

})



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
    },
    new:{
        type:Boolean,
        default:false
    },
    
})

const Book=mongoose.model('book',bookSchema);
module.exports= Book

