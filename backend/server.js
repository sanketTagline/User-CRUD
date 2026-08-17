// const http = require("http");


// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   res.end('Hello, World!\n');
// });

// const port = 5000;
// server.listen(port , () => {
//     console.log("Server running on http://localhost:",port);
// });


const http = require("http");

const userRoutes = require("./routes/user.route.js");


const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let body = "";

    req.on("data", (user) => {
        body += user.toString();
    });


    req.on("end", () => {

        let parsedBody = {};

        if (body) {
            try {
                parsedBody = JSON.parse(body);
            } catch (error) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                return res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));
            }
        }

        userRoutes(req, res, parsedBody);
    });
});

const port = 5000;

server.listen(port, () => {
    console.log("Server running on http://localhost:",port);
});










