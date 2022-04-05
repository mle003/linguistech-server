const vocabModel = require("./model")
const template = require("../../template")

const handlers = {
	async getVocabByTopic(req, res, next) {
		try {
			const { topic } = req.query
			if(!topic) {
				throw new Error("Need topic")
			}
			let vocab = await vocabModel.find({ topic: topic})
			console.log(vocab)
			res.json(template.successRes(vocab))
		} catch(error) {
			res.status(400)
			next(error)
		}
	}
}

module.exports = handlers