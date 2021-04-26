const express=require('express')
// const auth = require("../middleware/auth");
const auth = async (req, res, next) => {
	try {

		const token = req.header("Authorization").replace("Bearer ", "");
		console.log(process.env.JWT_SECRET)

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
const Admin = require('../models/adminModel')
const Book =require('../models/bookModel')
const router=new express.Router()


router.post("/admin/add" , async (req, res) => {
    const admin = new Admin(req.body);
	console.log(admin)
	try {
	    await admin.save();
		const token = await admin.generateAuthToken();
		res.send({ admin,token});
	} catch (err) {
		res.status(400).send({message:'invalid user ditails'});
	}
});


router.post("/admin/login", async (req, res) => {
	try {
		 const admin = await Admin.findAdminbyEmailAndPassword(req.body.email, req.body.password);
		 const token = await admin.generateAuthToken();
		//res.cookie('token', token)

		 res.send({admin,token})
		
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: 'unable to login!',
		});
	}
});

module.exports=router