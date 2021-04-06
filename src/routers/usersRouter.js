const express=require('express')
const auth = require("../middleware/auth");

const User = require('../models/userModel')
const router=new express.Router()



router.post("/users/add", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.send({ user,token });
	} catch (err) {
		res.status(400).send({message:'invalid user ditails'});
	}
});

router.post("/users/new", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: err.message,
		});
	}
});



router.post("/users/login", async (req, res) => {
	try {
		 const user = await User.findUserbyEmailAndPassword(req.body.email, req.body.password);
		 const token = await user.generateAuthToken();
		 res.send({user,token})
		
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
		res.send(req.user.email);
	} catch (err) {
		res.status(500).send(err);
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


module.exports=router