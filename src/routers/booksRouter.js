const express=require('express')
const Book = require('../models/bookModel')
const User = require('../models/userModel')




const router=new express.Router()


router.get('/books/get-all', async (req,res)=>{

    try{
       const books=await Book.find()
       res.send(books)
    }catch(err){
       res.status(400).send(err.message)
    }
})

router.get('/books/get', async (req,res)=>{

    try{
       const books=await Book.find(req.body)
       if(books.length===0)
       {
           res.status(404).send({'message':'no books to display'})
       }
       res.send(books)
    }catch(err){
       res.status(400).send(err.message)
    }
})




router.post('/books/add',async (req,res)=>{
    
    const booksToAdd=req.body
    try{
        if(!booksToAdd)
        {
            res.status(400).send({'message':'no books'})
        }
        for(let book of booksToAdd ){
            const bookToDB=new Book(book)
            bookToDB.save()
        }
   
        res.send(booksToAdd)
    }catch(err){
          res.status(500).send(err.message)
    }
})

router.patch('/books/edit', async(req,res)=>{
    
    const allowdUpdates = ["genres", "price","recommended","sale"];
	for (let update in req.body) {
		if (!allowdUpdates.includes(update)) {
			return res.status(400).send({
				status: 400,
				message: "Invalid update: " + update,
			});
		}
	}
    const id=req.query.id
    console.log(id)
    try{
        const book=await Book.findByIdAndUpdate(id,req.body, {
			new: true,
			runValidators: true,
		})
        if (!book) {
			return res.status(404).send({
				status: 404,
				message: "No book",
			});
		}
console.log(book)
		res.send(book);
      
    }catch(err){
          res.status(500).send(err.message)
    }
})

module.exports=router