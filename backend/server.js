// const http = require("http");


// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   res.end('Hello, World!\n');
// });

// const port = 5000;
// server.listen(port , () => {
//     console.log("Server running on http://localhost:",port);
// });


// const http = require("http");

// const userRoutes = require("./routes/user.route.js");
// const locationRoutes = require("./routes/location.route.js");


// const server = http.createServer((req, res) => {

//     // CORS
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Content-Type"
//     );


//     if (req.method === "OPTIONS") {
//         res.writeHead(200);
//         return res.end();
//     }
//     const url = new URL(req.url, 'http://localhost:5000');
//     const pathname = url.pathname;

//     if (pathname === "/api/getLocations") {
//         return locationRoutes(req, res);
//     }

//     let body = "";

//     req.on("data", (chunk) => {
//         body += chunk.toString();
//     });

//     req.on("end", () => {

//         let parsedBody = {};

//         if (body) {
//             try {
//                 parsedBody = JSON.parse(body);
//             } catch (error) {
//                 res.writeHead(400, {
//                     "Content-Type": "application/json"
//                 });

//                 return res.end(JSON.stringify({
//                     message: "Invalid JSON"
//                 }));
//             }
//         }

//         userRoutes(req, res, parsedBody);
//     });
// });

// const port = 5000;

// server.listen(port, () => {
//     console.log("Server running on http://localhost:", port);
// });




const http = require("http");
const fs = require("fs");
const path = require("path");

const userRoutes = require("./routes/user.route.js");
const locationRoutes = require("./routes/location.route.js");


const PORT = 5000;

const server = http.createServer((req, res) => {

    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");



    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    if (pathname === "/api/getLocations") {
        return locationRoutes(req, res);
    }

    if (pathname.startsWith("/api/users")) {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            let parsedBody = {};
            if (body) {
                try {
                    parsedBody = JSON.parse(body);
                } catch (err) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "Invalid JSON" }));
                }
            }
            userRoutes(req, res, parsedBody);
        });
        return;
    }

    
    
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:`,PORT);
});









