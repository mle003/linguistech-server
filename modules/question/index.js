const questionModel = require("./model")
const template = require("../../template")

const handlers = {
  async getQuestionsByType(req, res, next) {
    try {
      const { type } = req.query
      if (!type) {
        throw new Error("Need question type")
      }
      let questions = await questionModel.find({ type: type })
      res.json(template.successRes(questions))
    } catch (error) {
      res.status(400)
      next(error)
    }
  },
  async getQuestionsBySkill(req, res, next) {
    try {
      const { skill } = req.query
      if(!skill) {
        throw new Error("Need question skill")
      }
      let questions = await questionModel.find({ skill: skill })
      res.json(template.successRes(questions))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = handlers