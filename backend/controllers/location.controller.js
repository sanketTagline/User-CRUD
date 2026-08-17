

const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../data/locations.json");

const getLocations = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const locations = JSON.parse(data);

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(locations));
    } catch (error) {
        console.error("Error reading location data:", error);
        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Something went wrong while fetching locations"
        }));
    }
};

module.exports = {
    getLocations
};
