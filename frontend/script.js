const API_URL = "http://localhost:5000/api";

window.onload = function () {
    fetchLocations();
    fetchUsers();
};
// locations :- 


let locations ={};


async function fetchLocations() {
    try {
        let response = await fetch(API_URL + "/locations");
        locationData = await response.json();
        populateCountries();
    } catch (error) {
        console.error("Error fetching locations:", error);
    }
}

function populateCountries() {
    let countrySelect = document.getElementById("country");
    countrySelect.innerHTML = '<option value="">Select Country</option>';

    for (let country in locationData) {
        let option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
}


document.getElementById("country").onchange = function () {
    let selectedCountry = this.value;
    let stateSelect = document.getElementById("state");
    let districtSelect = document.getElementById("district");


    stateSelect.innerHTML = '<option value="">Select State</option>';
    districtSelect.innerHTML = '<option value="">Select District</option>';
    districtSelect.disabled = true;

    if (selectedCountry) {
        stateSelect.disabled = false;
        let states = Object.keys(locationData[selectedCountry] || {});
        for (let state of states) {
            let option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        }
    } else {
        stateSelect.disabled = true;
    }
};

// When State changes -> Populate District dropdown

document.getElementById("state").onchange = function () {
    let selectedCountry = document.getElementById("country").value;
    let selectedState = this.value;
    let districtSelect = document.getElementById("district");

    districtSelect.innerHTML = '<option value="">Select District</option>';

    if (selectedCountry && selectedState) {
        districtSelect.disabled = false;
        let districts = locationData[selectedCountry][selectedState] || [];
        for (let district of districts) {
            let option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        }
    } else {
        districtSelect.disabled = true;
    }
};

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