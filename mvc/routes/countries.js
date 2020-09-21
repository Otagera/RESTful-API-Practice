const express = require('express');
const router = express.Router();

let countryCtlr = require('../controllers/countries');

router.route('/')
		.get(countryCtlr.getCountryList)
		.post(countryCtlr.createCountry);

router.route('/new')
		.get(countryCtlr.getCountryForm);

router.route('/:countryid/edit')
		.get(countryCtlr.getEditCountryForm);

router.route('/:countryid')
		.get(countryCtlr.getCountry)
		.put(countryCtlr.editCountry)
		.delete(countryCtlr.deleteCountry);


module.exports = router;