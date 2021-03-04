const express=require('express')

const takeBookDB=require('../models/take-book-models')


const router=new express.Router()


router.get('/books/get-all', async (req,res)=>{

    try{
       const books=await takeBookDB.find()
       res.send(books)
    }catch(err){
       res.status(400).send(err.message)
    }
})

router.get('/books/get', async (req,res)=>{

    try{
       const books=await takeBookDB.find(req.body)
       if(books.length===0)
       {
           res.status(404).send({'message':'no books to display'})
       }
       res.send(books)
    }catch(err){
       res.status(400).send(err.message)
    }
})




router.post('/books/add', (req,res)=>{
    
    const booksToAdd=req.body
    try{
        if(!booksToAdd)
        {
            res.status(400).send({'message':'no books'})
        }
        for(let book of booksToAdd ){
            const bookToDB=new takeBookDB(book)
            bookToDB.save()
        }
   
        res.send(booksToAdd)
    }catch(err){
          res.status(500).send(err.message)
    }
})


module.exports=router