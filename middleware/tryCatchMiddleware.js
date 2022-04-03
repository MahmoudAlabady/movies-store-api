
// const Logger = require('../services/logger.service');

// const logger = new Logger('genres');

function tryCatchMiddleware(handler) {
    return async (req, res, next)=>{
try {
    await handler(req, res)
} catch (err) {
    // logger.info("return err" , err);

    next(err)
}
    };
}

module.exports= tryCatchMiddleware;