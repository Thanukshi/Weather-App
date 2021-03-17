const express = require('express');
const fetch = require('node-fetch');

let router = express.Router();

router.get('/:locationName', (req, res) => {
    const locationName = req.params.locationName;
    console.log(locationName);

    const url = "https://www.metaweather.com/api/location/search/?query=" + locationName;

    let woeid;

    fetch(url)
        .then( response => { return response.json(); })
            .then(data => {
                console.log("data from fetch : ", data);
                
                woeid = data[0].woeid;
                let url2 = 'https://www.metaweather.com/api/location/' + woeid + '/';
                fetch(url2)
                    .then(r => {
                        return r.json();
                    })
                    .then(d => { 
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.send(d);
                    })
                        .catch(err => {
                            console.log(err);
                        })
            })
                .catch(err => {console.log(err);});
})

module.exports = router;