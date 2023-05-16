
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('minSalary') && urlParams.has('maxSalary')) {
    queryTable();
} else {
    userTable();
}

async function getAllUsers() {
    const response = await fetch("http://localhost:3000/getAllUsers");
    const jsonData = await response.json();
    return jsonData;
}

async function getSalaryWithinRange() {
    const minSalary = urlParams.get('minSalary');
    const maxSalary = urlParams.get('maxSalary');
    const url = `http://localhost:3000/getSalaryWithinRange?minSalary=${(minSalary)}&maxSalary=${(maxSalary)}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
}

function userTable() {
    var table = document.getElementById("userTable");

    getAllUsers().then((jsonData) => {
        for (var i = 0; i < jsonData.length; i++) {
            var row = table.insertRow();
            var idCell = row.insertCell(0);
            var nameCell = row.insertCell(1);
            var surnameCell = row.insertCell(2);
            var ageCell = row.insertCell(3);
            var salaryCell = row.insertCell(4);

            idCell.innerHTML = jsonData[i].id;
            nameCell.innerHTML = jsonData[i].name;
            surnameCell.innerHTML = jsonData[i].surname;
            ageCell.innerHTML = jsonData[i].age;
            salaryCell.innerHTML = jsonData[i].salary;

        }
    });
}

function queryTable() {
    var table = document.getElementById("userTable");

    getSalaryWithinRange().then((jsonData) => {
        for (var i = 0; i < jsonData.length; i++) {
            var row = table.insertRow();
            var idCell = row.insertCell(0);
            var nameCell = row.insertCell(1);
            var surnameCell = row.insertCell(2);
            var ageCell = row.insertCell(3);
            var salaryCell = row.insertCell(4);

            idCell.innerHTML = jsonData[i].id;
            nameCell.innerHTML = jsonData[i].name;
            surnameCell.innerHTML = jsonData[i].surname;
            ageCell.innerHTML = jsonData[i].age;
            salaryCell.innerHTML = jsonData[i].salary;
        }
    });
}