const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("./bookModel");

const adminSchema = new mongoose.Schema(
	{
		
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid email");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 7,
			validate(value) {
				const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/;
				if (!passRegex.test(value)) {
					throw new Error("password must contain big and small characters and numbers");
				}
			},
		},
		
		tokens: [
			{
				token: {
					type: String,
					required: true,
				}
			}
		]
	},
	{
		timestamps: true,
	}
);

adminSchema.pre("save", async function (next) {
	const admin = this;

	if (admin.isModified("password")) {
		admin.password = await bcrypt.hash(admin.password, 8);
	}

	next();
});

adminSchema.statics.findAdminbyEmailAndPassword = async (email, password) => {
	const admin = await Admin.findOne({ email });
	if (!admin) {
		throw new Error("unable to login");
	}

	const isPassMatch = await bcrypt.compare(password, admin.password);

	if (!isPassMatch) {
		throw new Error("unable to login");
	}
	return admin;
};

adminSchema.methods.generateAuthToken = async function () {
	const admin = this;
	const token = jwt.sign(
		{
			_id: admin._id,
		},
		process.env.secret,
		{
			expiresIn: "30s",
		}
	);
	admin.tokens = admin.tokens.concat({ token });
	console.log(admin.tokens)

	 await admin.save();

	return token;
};

// userSchema.methods.toJSON = function () {
// 	const user = this;
// 	const userObj = user.toObject();

// 	delete userObj.password;
// 	delete userObj.tokens;

// 	return userObj;
// };

// adminSchema.virtual("tasks", {
// 	ref: "Task",
// 	localField: "_id",
// 	foreignField: "admin",
// });

adminSchema.pre("remove", async function (next) {
	const admin = this;
	await Task.deleteMany({ admin: admin._id });
	next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

