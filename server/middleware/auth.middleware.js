const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (request, response, next) => {
    if (request.method === 'OPTIONS'){
        return next();
    }

    try {
        const token = request.headers.authorization.split(' ')[1] // Bearer: token
        console.log('headers: ', request.headers);
        if (!token){
            return response.status(401).json({message: 'Not authorized'});
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        request.user = decoded;
        next();

    } catch(e){
        console.log(e.message);
        response.status(401).json({message: 'Not authorized'});
    }
}