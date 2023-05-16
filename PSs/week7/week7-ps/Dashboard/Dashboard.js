function addData() {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var age = document.getElementById("age").value;
    var salary = document.getElementById("salary").value;


    const data = { name, surname, age, salary };

    fetch("http://localhost:3000/addUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => {
        alert("Data added successfully!")
        window.location.href = "../UserTable/UserTable.html";

      })
      .catch(error => console.error(error));
}

function queryData() {
  var minSalary = document.getElementById("min-salary").value;
  var maxSalary = document.getElementById("max-salary").value;

  window.location.href = `../UserTable/UserTable.html?minSalary=${minSalary}&maxSalary=${maxSalary}`;

}