const express = require("express")
const cors = require("cors")
const app = express()
const personRouter = require("./controllers/person")
const middleware = require("./utils/middleware")
// const mongoose = require("mongoose")
const logger = require("./utils/logger")

// mongoose.connect(config.MONGODB_URI).then(() => {
//     logger.info("Connected to MongoDB")
// }).catch(err => {
//     logger.error("Connection failed with error : ", err)
// })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use("/api/persons", personRouter)
app.use(middleware.unknownEndPointHandler)
app.use(middleware.errorHandler)

module.exports = app;