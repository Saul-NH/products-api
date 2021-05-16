const { param } = require('express-validator');

const objectIdFormatValidationArray =[
    param('userId', 'The userId does not have a valid format').isMongoId()
]

module.exports = {
    objectIdFormatValidationArray
}