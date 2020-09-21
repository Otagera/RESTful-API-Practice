
getIndex = function(req, res, next) {
  res.render('index', { title: 'RESTful Routing' });
}

getExample = function(req, res, next) {
  res.render('example', { title: 'Example HTTP Requests' });
}

getReqExample = function(req, res, next) {
	res.statusJson(200, { message: 'User made a GET request' });
}

postReqExample = function(req, res, next) {
	res.statusJson(201, { message: 'User made a POST request' });
}

putReqExample = function(req, res, next) {
	res.statusJson(401, { message: 'User made a PUT request' });
}

deleteReqExample = function(req, res, next) {
	res.statusJson(500, { message: 'User made a DELETE request' });
}

getRestful = function(req, res, next) {
  res.render('restful', { title: 'RESTful Routing Architecture' });
}

getStatusCodes = function(req, res, next) {
  res.render('status-codes', { title: 'HTTP Status Codes' });
}




module.exports = {
    getIndex,
    getExample,
    getReqExample,
    postReqExample,
    putReqExample,
    deleteReqExample,
    getRestful,
    getStatusCodes
}
