

const express=require('express')
const Book = require('../models/bookModel')
const User = require('../models/userModel')
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	try {

		const token = req.header("Authorization").replace("Bearer ", "");

		const data = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({
			_id: data._id,
			"tokens.token": token,
		});

		if (!user) {
			throw new Error();
		}

		req.user = user;
		req.token = token;
		next();
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: "not authenticate",
		});
	}
};

const router=new express.Router()



router.post("/users/add", async (req, res) => {
	console.log(req.body)
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.send({ user,token });
	} catch (err) {
		res.status(400).send({message:'invalid user ditails'});
	}
});


router.post("/users/login", async (req, res) => {
	try {
		 const user = await User.findUserbyEmailAndPassword(req.body.email, req.body.password);
		 const token = await user.generateAuthToken();
		 const expirationTime=Date.now()+30000
		 res.send({user,token,expirationTime})


		
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: 'unable to login!',
		});
	}
});


router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((tokenDoc) => tokenDoc.token !== req.token);
		await req.user.save();
		res.send({data:req.user.name});
		
	} catch (err) {
		res.status(500).send({msg:err});
	}
});

router.post("/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (err) {
		res.status(500).send(err);
	}
});


router.post("/users/bookPurchase/:bookId",auth, async (req, res) => {
	try {
		const bookId=req.params.bookId;
		const purchasedBook=Book.findById(bookId)
		if(purchasedBook!=undefined){
			req.user.purchasedBooks.push(bookId)
			await req.user.save();
			res.status(200).send(req.user.purchasedBooks)
		}
		else{
			res.status(404).send({
				status: 404,
				message: 'book not found'
			});
		}
       
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: 'must be logged in!',
		});
	}
});


router.post("/users/bookUnPurchase/:bookId",auth, async (req, res) => {
	try {
		const bookId=req.params.bookId;
		const unPurchasedBook=Book.findById(bookId)
		if(req.user.purchasedBooks.length>0){
			req.user.purchasedBooks.splice(req.user.purchasedBooks.indexOf(bookId),1)
			await req.user.save();
			res.status(200).send(req.user.purchasedBooks)
		}
		else{
			res.status(404).send({
				status: 404,
				message: 'book not found'
			});
		}
       
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: 'must be logged in!',
		});
	}
});


module.exports=router