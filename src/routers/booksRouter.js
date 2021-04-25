const express=require('express')
const Book = require('../models/bookModel')
const User = require('../models/userModel')
const auth = require("../middleware/auth");

const router=new express.Router()


router.get('books/get-all', async (req,res)=>{

    try{
       const books=await Book.find()
       res.send(books)
    }catch(err){
       res.status(400).send(err.message)
    }
})
// router.get('books/get/:id', async (req,res)=>{
//     const bookId=req.params.id;
//     console.log(bookId)
//      try{
//         const books=await Book.findById(bookId)
//         if(!books)
//         {
//             res.status(404).send({'message':'no books to display'})
//         }
//         res.send(books)
//      }catch(err){
//         res.status(400).send(err.message)
//      }
//  })
 


// router.get('books/get-by-id', auth, async (req,res)=>{
//     const purchasedsBooksIds=req.user.purchasedBooks
//     try{
//         console.log('books!')
//         const books=[]
//         if(purchasedsBooksIds.length>0){
//            for(let bookId of purchasedsBooksIds){
//                 let book= await Book.findById(bookId)
//                 books.push(book)
//            }

//         }
//         res.send(books)
//         console.log(books)

//     }catch (err) {
// 		res.status(400).send({
// 			status: 400,
// 			message: 'must be logged in!',
// 		});
// 	}
// })

// router.get('books/:searchValue', async (req,res)=>{
//     const searchValue=req.params.searchValue;
//     const regex = new RegExp(searchValue, 'i') // i for case insensitive
//      try{

//         const booksByBookName=await Book.find({bookName: {$regex: regex}})
//         const booksByAuthorName=await Book.find({authorName: {$regex: regex}})
//         books=booksByBookName.concat(booksByAuthorName)
//         if(!books)
//         {
//             res.status(404).send({'message':'no books to display'})
//         }
//         res.send(books)
//      }catch(err){
//         res.status(400).send(err.message)
//      }
//  })




// router.post('books/add',async (req,res)=>{
    
//     const bookToAdd=new Book(req.body)
//     try{
//         if(!bookToAdd)
//         {
//             res.status(400).send({'message':'no books'})
//         }
      
//         await bookToAdd.save()
//         res.send(bookToAdd)
//     }catch(err){
//           res.status(500).send(err.message)
//     }
// })

// router.post('books/remove/:id',async (req,res)=>{
    
//     const bookToRemove=await Book.findById(req.params.id)
//     try{
//         if(!bookToRemove)
//         {
//             res.status(400).send({'message':'no book'})
//         }
//         await Book.findByIdAndDelete(bookToRemove._id)
//         res.send(bookToRemove)
//     }catch(err){
//           res.status(500).send(err.message)
//     }
// })

// router.patch('books/edit/:id', async(req,res)=>{

//     const id=req.params.id
//     try{
//         const book=await Book.findByIdAndUpdate(id,req.body, {
// 			new: true,
// 			runValidators: true,
// 		})
//         if (!book) {
// 			return res.status(404).send({
// 				status: 404,
// 				message: "No book",
// 			});
// 		}
// 		res.send(book);
      
//     }catch(err){
//           res.status(500).send(err.message)
//     }
// })

module.exports=router