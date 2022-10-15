const logger = require("./logger")
const requestLogger = (request ,response, next) => {
    logger.info("Method: ", request.method)
    logger.info("Path: ", request.path)
    logger.info("Body: ", request.body)
    logger.info("---")
    next()
}

const unknownEndPointHandler = (request, response) => {
    response.status(404).json({
        error: "Unknown Endpoint"
    })
}

const errorHandler = (request, response, next) => {
    logger.error(error.message)
    if(error.name == "CastError")
        return response.status(400).json({
            error: "Malformed Id"
        })
    else if(error.name == "ValidationError")
        return response.status(400).json({
            error: error.message
        })
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndPointHandler,
    errorHandler
}