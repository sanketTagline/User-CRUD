const { getLocations } = require("../controllers/location.controller.js");


const locationRoute = (req, res) => {

    const url = new URL(req.url, 'http://localhost:5000');
    const pathname = url.pathname;


    if(req.method === "GET" && pathname === "api/getLocations") {
        return getLocations(req, res);

    }
   
}

module.exports = locationRoute;