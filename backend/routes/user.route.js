
const { getAllUsers,createUser, getByIDUser, UpdateUser, deleteUser} = require("../controllers/user.controller.js");

const userRoutes = (req,res,body)=>{

  const url = new URL(req.url,'https://localhost:5000');
  const pathname = url.pathname;



   if (req.method === "GET" && pathname === "/api/users/getAllUsers") {
        return getAllUsers(req, res);
    }

    if (req.method === "GET" && pathname.startsWith("/api/users/getByIDUser/")) {

        const id = pathname.split("/")[4];

        return getByIDUser(req, res, id);
    }


    if (req.method === "POST" && pathname === "/api/users/createUser") {
        return createUser(req, res, body);
    }

   
    if (req.method === "PUT" && pathname.startsWith("/api/users/updateUser/")) {

        const id = pathname.split("/")[4];

        return UpdateUser(req, res, id, body);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/users/deleteUser/")) {

        const id = pathname.split("/")[4];

        return deleteUser(req, res, id);
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        message: "Route not found"
    }));
}


module.exports = userRoutes;

