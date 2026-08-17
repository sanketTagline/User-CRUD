const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../data/user.json");

const getUsers = async () => {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

const saveUsers = async (users) => {
    await fs.writeFile(
        filePath,
        JSON.stringify(users, null, 2)
    );
};

const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(users));
    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Something went wrong"
        }));
    }
};



const createUser = async (req, res, body) => {
    try {
        const users = await getUsers();

        const {
            name,
            email,
            phoneNumber,
            hobbyId,
            country,
            state,
            district,
            status
        } = body;

        

        const newUser = {
            id: users.length
                ? users[users.length - 1].id + 1
                : 1,
            name,
            email,
            phoneNumber,
            hobbyId: hobbyId || [],
            country,
            state,
            district,
            status
        };
    
        const emailExists = users.some(
            (user) => user.email.toLowerCase() === body.email.toLowerCase()
        );

        if (emailExists) {
            res.writeHead(409, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                message: "Email already exists"
            }));
        }

        users.push(newUser);

        await saveUsers(users);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "User created successfully",
            data: newUser
        }));

    } catch (error) {
        console.log(error);
        
        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Something went wrong"
        }));
    }
};

const getByIDUser = async (req, res,id) => {
    try {
        const users = await getUsers();

        const user = users.find(
            (user) => user.id === Number(id)
        );

        if (!user) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                message: "User not found!"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(user));

    } catch (error) {
        // console.log(error);
        
        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Something went wrong"
        }));
    }
};


const UpdateUser = async(req,res,id,body)=>{
    try {
        const users = await getUsers();

        const user = users.find((user)=>user.id === Number(id));

         if (!user) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                message: "User not found!"
            }));
        }

        user.name = body.name || user.name;
        user.email = body.email || user.email;
        user.phoneNumber = body.phoneNumber || user.phoneNumber;
        user.hobbyId = body.hobbyId || user.hobbyId;
        user.country = body.country || user.country;
        user.state = body.state || user.state;
        user.district = body.district || user.district;

        await saveUsers(users);

        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify({
            message:"User Updated successfully",
            data:user
        }));


    } catch (error) {
        console.log(error);
        
        res.writeHead(500, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({
            message: "Something went wrong"
        }));
    }
}


const deleteUser = async(req,res,id)=>{
    
    try {
        const users = await getUsers();
        const Idx = users.findIndex(user => user.id === Number(id));
        if(Idx === -1){
            res.writeHead(404, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({
            message: "User not found"
        }));
        }
        const deletedUser = users.splice(Idx,1);
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify({
            message:"User deleted successfully",
            data:deletedUser[0]
        }))

        await saveUsers(users);

    } catch (error) {
        console.log(error);
        
        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Something went wrong"
        }));
    }
}

module.exports = {
    getAllUsers,
    getByIDUser,
    createUser,
    UpdateUser,
    deleteUser
};