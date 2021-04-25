// const express=require('express')
// const auth = require("../middleware/auth");

// const Admin = require('../models/adminModel')
// const Book =require('../models/bookModel')
// const router=new express.Router()


// router.post("/admin/add" , async (req, res) => {
//     const admin = new Admin(req.body);
// 	console.log(admin)
// 	try {
// 	    await admin.save();
// 		const token = await admin.generateAuthToken();
// 		res.send({ admin,token});
// 	} catch (err) {
// 		res.status(400).send({message:'invalid user ditails'});
// 	}
// });


// router.post("/admin/login", async (req, res) => {
// 	try {
// 		 const admin = await Admin.findAdminbyEmailAndPassword(req.body.email, req.body.password);
// 		 const token = await admin.generateAuthToken();
// 		//res.cookie('token', token)

// 		 res.send({admin,token})
		
// 	} catch (err) {
// 		res.status(400).send({
// 			status: 400,
// 			message: 'unable to login!',
// 		});
// 	}
// });

// module.exports=router