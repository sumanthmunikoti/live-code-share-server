const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send({reponse : "Response this"}).status(200)
})

module.exports = router