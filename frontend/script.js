const API_URL = "http://localhost:5000/api";

window.onload = function () {
    // fetchLocations();
    fetchUsers();
};
// locations :- 


// let locations ={};


// async function fetchLocations() {
//     try {
//         let response = await fetch(API_URL + "/locations");
//         locationData = await response.json();
//         populateCountries();
//     } catch (error) {
//         console.error("Error fetching locations:", error);
//     }
// }


// Users APIS Integragation :- 

// 1. GetAllUsers API Integration :- 

async function fetchUsers() {
    try {
        let response = await fetch(API_URL + "/users/getAllUsers");
        let users = await response.json();
        renderUserTable(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}


function renderUserTable(users) {
    let tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";

    for (let user of users) {
        let hobbiesText = user.hobbies ? user.hobbies.join(", ") : "";
        let locationText = `${user.district}, ${user.state}, ${user.country}, ${user.pincode}`;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.gender}</td>
            <td>${hobbiesText}</td>
            <td>${locationText}</td>
            <td>
                <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}