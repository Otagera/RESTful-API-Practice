var express = require("express");
var router = express.Router();

let countryCtrl = require("../controllers/countries");

let apiGuard = (req, res, next)=>{
	// if(res.get('host') !== 'localhost:3000'){
		// res.statusJson(404, { error: 'Cannot Create, Update or Delete countries from the API while in production'});
	// } else {
		next();
	// }
}

router.route('/countries/:countryid')
		.get(countryCtrl.getCountry)
		.put(apiGuard, countryCtrl.editCountry)
		.delete(apiGuard, countryCtrl.deleteCountry);

router.route('/countries')
		.get(countryCtrl.getCountries)
		.post(apiGuard, countryCtrl.createCountry);

router.get('/reset', apiGuard, countryCtrl.reset);

module.exports = router;