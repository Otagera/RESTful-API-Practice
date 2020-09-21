const mongoose = require('mongoose');
const Country = mongoose.model('Country');

let countryData = require('../../country-data');

getCountries = function(req, res, next) {
    Country.find((err, countries)=>{
        if(err) { return res.json({ error: err })}

        res.statusJson(200, { 
            message: 'Getting all the countries',
            countries: countries
        });
    });
}

createCountry = function({ body }, res, next) {
    if(!body.name) { return res.statusJson(400, { message: "Missing name for the country" });}

    Country.find({}, null, { sort: { fakeid : 1}}, (err, countries)=>{
        if(err) { return res.json({ error: err })}

        for(let i = 0; i < countries.length; i++){
            if(countries[i].fakeid != i + 1){
                var newID = i + 1;
                break;
            }
        }
        country = { 
            name: body.name,
            fakeid: newID || countries.length + 1
        };
        Country.create(country, (err, newCountry)=>{
            if(err) { return res.json({ error: err })}
            res.statusJson(201, { 
                message: "Created a New Country",
                newCountry: newCountry
            });
        });
    });
}

getCountry = function({ params }, res, next) {
    Country.findOne({ fakeid: params.countryid }, (err, country)=>{
        if(err) { return res.json({ error: err })}
        res.statusJson(200, { 
            message: "Get Specific Country",
            country: country
        });
    });
}

editCountry = function({ body, params }, res, next) {
    if(!body.name) { return res.statusJson(400, { message: "Missing name for the country" });}

    
    Country.findById(params.countryid, (err, country)=>{
        if(err) { return res.json({ error: err })}

        if(!country) { res.statusJson(404, { message: "Could not get Specific Country" }) }

        country.name = body.name;
        country.save((err, updatedCountry)=>{
            res.statusJson(201, { 
                message: "Country updated",
                country: updatedCountry
            });            
        });
    });
}

deleteCountry = function({ params }, res, next) {
    Country.findByIdAndRemove(params.countryid, (err, country)=>{
        if(err) { return res.json({ error: err })}

        if(!country) { res.statusJson(404, { message: "Could not find Country" }) }

        res.statusJson(204, { 
            message: "Deleted specific Country",
            country: country
        });            
    });
}

reset = function(req, res){
    Country.deleteMany({}, (err, info)=>{
        if(err) { return res.json({ error: err }); }
        Country.insertMany(countryData, (err, info)=>{
            if(err) { return res.json({ error: err }); }
            res.redirect('/countries');
        });
    });
}

module.exports = {
    getCountries,
    createCountry,
    getCountry,
    editCountry,
    deleteCountry,
    reset
}