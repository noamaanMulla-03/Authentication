const express = require("express");
const UserModel = require("../models/user.model");

const router = express.Router();

router.post("/signup", (req, res) => {
	UserModel.create(req.body)
		.then((user) => {
			console.log("Data Received: ", user);
			res.json(user);
		})
		.catch((err) => res.status(400).json(err));
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;

	UserModel.findOne({ email: email })
		.then((user) => {
			if (!user) return res.status(404).json("User not found!");
			else {
				if (user.password === password)
					return res.status(200).json(user);
				else return res.status(401).json("Incorrect Password!");
			}
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json("Internal server error!");
		});
});

module.exports = router;
