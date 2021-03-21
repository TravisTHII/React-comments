const mongoose = require('mongoose')

const mongoDb = async () => {
	try {

		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)

	} catch (error) {

		console.log(`Error: ${error.message}`.red)
		process.exit(1)

	}
}

module.exports = mongoDb