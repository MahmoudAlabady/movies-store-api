
// const Logger = require('../services/logger.service');

// const logger = new Logger('genres');


function error(err,req,res,next) {
    res.status(500).send('error'+err)
    // logger.info("return genres List" , err);

}


module.exports = error;