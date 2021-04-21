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
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7QeedeCYLk1rX2mH2nzV_fioH1ae0g6gprkKElXTGAZD3U5SmM8MxgMNVITh_cf7nY94&usqp=CAU'
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

