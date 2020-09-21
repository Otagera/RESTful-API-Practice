const request = require('request');

let domainPath = "http://localhost:3000";


if (process.env.NODE_ENV === 'production') {
    domainPath = "https://leocountryapi.herokuapp.com";
}


getCountryList = function(req, res, next) {
	const path = "/api/countries";
	const requestOptions = {
		url: `${domainPath}${path}`,
		method: 'GET'
	}

	request(requestOptions, (err, response, body)=>{
		if(err) { return res.json( {error: err} ); }
		let countries = JSON.parse(body).countries;
		if(response.statusCode === 200) {
			return res.render('countries', { title: "List of Countries", countries: countries})
		}
		res.json({ message: "Something went wrong" });
	});
}

getCountryForm = function(req, res, next) {
    res.render('form', { title: 'Create a Country' });
}

getCountry = function({ params }, res, next) {
	const path = `/api/countries/${params.countryid}`;
	const requestOptions = {
		url: `${domainPath}${path}`,
		method: 'GET'
	}

	request(requestOptions, (err, response, body)=>{
		if(err) { return res.json( {error: err} ); }
		let parsedBody = JSON.parse(body);
		if(parsedBody.error) { return res.send({ error: parsedBody.error }); }
		if(response.statusCode === 200) {
			return res.render('country', { title: "Country Interface", country: parsedBody.country });
		}
		res.json({ message: "Something went wrong" });
	});
}

createCountry = function({ body }, res, next) {
	const path = `/api/countries`;
	const requestOptions = {
		url: `${domainPath}${path}`,
		method: 'POST',
		json: { name: body.name }
	}
	request(requestOptions, (err, response, body)=>{
		if(err) { return res.json( {error: err} ); }
		if(response.statusCode === 404) { return res.json(body); }
		if(response.body.error){ return res.json({ error: response.body.error }); }
		if(response.statusCode === 201) {
			return res.redirect('/countries');
		}
	});
}

getEditCountryForm = function({ params }, res, next) {
	const path = `/api/countries/${params.countryid}`;
	const requestOptions = {
		url: `${domainPath}${path}`,
		method: 'GET'
	}

	request(requestOptions, (err, response, body)=>{
		if(err) { return res.json( {error: err} ); }

		let parsedBody = JSON.parse(body);
		if(parsedBody.error) { return res.send({ error: parsedBody.error }); }
		if(response.statusCode === 200) {
			return res.render('form', { title: 'Update a Country', country: parsedBody.country });
		}
	});
}

editCountry = function({ body, params }, res, next) {
	const path = `/api/countries/${params.countryid}`;
	const requestOptions = {
		url: `${domainPath}${path}`,
		method: 'PUT',
		json: { name: body.name }
	}

	request(requestOptions, (err, response, body)=>{
		if(err) { return res.json( {error: err} ); }
		if(response.statusCode === 404) { return res.json(body); }
		if(response.statusCode === 201) {
			return res.redirect('/countries');
		}
	});
}

deleteCountry = function({ params }, res, next) {
	const path = `/api/countries/${params.countryid}`;
	const requestOptions = {
		url: `${domainPath}${path}`,
		method: 'DELETE'
	}

	request(requestOptions, (err, response, body)=>{
		if(err) { return res.json( {error: err} ); }
		if(response.statusCode === 404) { return res.json(body); }
		return res.redirect('/countries');
	});
}

module.exports = {
	getCountryList,
	getCountryForm,
	getCountry,
	createCountry,
	getEditCountryForm,
	editCountry,
	deleteCountry
}