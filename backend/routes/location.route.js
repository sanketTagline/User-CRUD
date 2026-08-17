
const { getLocations } = require("../controllers/location.controller.js");

const locationRoutes = (req, res) => {
    const url = new URL(req.url, 'http://localhost:5000');
    const pathname = url.pathname;

    if (req.method === "GET" && pathname === "/api/locations") {
        return getLocations(req, res);
    }

    return false; 
};

module.exports = locationRoutes;
