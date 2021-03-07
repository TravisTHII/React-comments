const User = require("../models/User")

const { Slugify } = require("../utils/functions")

// @desc 		Get all users
// @route 	GET /api/hmd/user
// @access 	Public
exports.getUsers = async (req, res) => {
	try {

		const users = await User.find()

		return res.status(200).json({
			users
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}

// @desc 		Create a user
// @route 	GET /api/hmd/user/create
// @access 	Public
exports.createUser = async (req, res) => {
	try {

		const { username, motto, badge, image } = req.body

		if (!username)
			return res.status(400).json({ message: 'Please enter a username' })

		const newUser = new User({
			username,
			slug: Slugify(username),
			motto,
			badge: {
				...badge
			},
			image: {
				...image
			}
		})

		const user = await newUser.save()

		return res.status(200).json({
			user
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}