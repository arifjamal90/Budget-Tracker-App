const addBtn = document.querySelector(".AddExpenses");
const updateBtn = document.querySelector(".updateed");
const totalAmountDisplay = document.querySelector("#totalAmount");
const remainingAmountDisplay = document.querySelector("#remainingAmount");
const expensesAmountDisplay = document.querySelector("#expensesAmount");
const categoryFilter = document.querySelector(".selecttedd")
const dateFilter = document.querySelector("#datefilter")
const amountsort = document.querySelector("#amountsorte")
const searchItems= document.querySelector(".searchItem")
const totalAddBtn = document.querySelector(".totalBtn");
const expenseTable = document.querySelector(".table");
const tableTr = document.querySelector(".tableRow")
const tableBody = document.querySelector(".tbody")
const selectElement = document.getElementById("inputCreate");
const selectedOption= document.querySelector(".selecttedd")
console.log(updateBtn, 'asim');
let tasks = [];
let totalExpenses = 0;
let ascending = true;

// operation start here-----------------------------------------


selectElement.addEventListener("change", function() {
  if (this.value === "addClothe") {

    const inputField = document.createElement("input");
    inputField.classList.add("inputfiled");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Enter clothes");
    
    
    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.classList.add("addButton");

    addButton.addEventListener("click", (e)=>{
     e.preventDefault();

     const myoption = document.createElement("option");
     myoption.classList.add("option")
     myoption.textContent=inputField.value;

     selectElement.appendChild(myoption);

     const myoption2 = document.createElement("option");
     myoption2.classList.add("option");
     myoption2.textContent=inputField.value;
     
    selectedOption.appendChild(myoption2);
     
     
      inputField.style.display= "none";
      addButton.style.display='none'
     console.log(selectElement,'hahhahahahah');
    })
  

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("inputContainer");
    containerDiv.appendChild(inputField);
    containerDiv.appendChild(addButton);

  
    selectElement.parentNode.insertBefore(containerDiv, selectElement.nextSibling);
  }
});


addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const remainingAmount = parseFloat(remainingAmountDisplay.textContent.split(":")[1]);

  if (remainingAmount <= 0) {
    alert("Please add more funds before adding expenses.");
    return;
  }

  const inputFieldSpend = parseFloat(document.querySelector(".inputData").value);
  const inputSelect = document.querySelector(".select").value;
  const inputDate = document.querySelector(".dateee").value;
  if (isNaN(inputFieldSpend) || inputSelect === "" || inputDate === "") {
    alert("Please fill all the details");
    return;
  }
// add amount in epensis here----------------------------
  totalExpenses += inputFieldSpend;
  expensesAmountDisplay.textContent = `Expenses Amount is: ${totalExpenses}`;

// data add in table here-----------------------------

  let newRow = document.createElement("tr");
  newRow.classList.add("tableRow");
  newRow.innerHTML = `
    <td>${inputFieldSpend}</td>
    <td>${inputSelect}</td> 
    <td>${inputDate}</td>
    <td>
      <button class='delete' onclick="deleteHandle(this)">
        <i class="fa fa-trash-o delete" aria-hidden="true"></i>
      </button>
      <button class ="edit" onclick="editHandle(this)">
        <i class="fa fa-pencil-square edit" aria-hidden="true"></i>
      </button>
    </td>
  `;


  tableBody.appendChild(newRow)

  const innerValue = newRow.innerText;
  tasks.push(innerValue);

  updateRemainingAmount();

  document.querySelector(".inputData").value = "";
  document.querySelector(".select").value = "";
  document.querySelector(".dateee").value = "";
});


// add amount here--------------------------
totalAddBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputFieldTotalAmount = parseFloat(document.querySelector(".totalInputData").value);

  if (isNaN(inputFieldTotalAmount)) {
    alert("Please enter a valid total amount");
    return;
  }

  totalAmountDisplay.textContent = `Total Amount is: ${inputFieldTotalAmount}`;
  updateRemainingAmount();

  document.querySelector(".totalInputData").value = "";
});

function updateRemainingAmount() {
  const totalAmount = parseFloat(totalAmountDisplay.textContent.split(":")[1]);
  const remainingAmount = totalAmount - totalExpenses;
  remainingAmountDisplay.textContent = `Remaining Amount is: ${remainingAmount}`;
  
  if (remainingAmount < 0) {
    alert("Your amount is below 00!!!");
    return;
  }
  
}

// delete code here----------------------------------------------
function deleteHandle(button) {
  const row = button.closest('tr');
  row.remove();
}

expenseTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    deleteHandle(e.target);
  }
});
// edit code here--------------------------------------
function editHandle(button) {
  updateBtn.style.display = "block";
  addBtn.style.display = "none";

  const row = button.closest('tr');
  row.classList.add("editing");
  const cells = row.querySelectorAll('td');

  const inputFieldSpend = cells[0].textContent;
  const inputSelect = cells[1].textContent;
  const inputDate = cells[2].textContent;

  document.querySelector(".inputData").value = inputFieldSpend;
  document.querySelector(".select").value = inputSelect;
  document.querySelector(".dateee").value = inputDate;
}

 
// update code here----------------------------------------------
updateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const inputFieldSpend = parseFloat(document.querySelector(".inputData").value);
  const inputSelect = document.querySelector(".select").value;
  const inputDate = document.querySelector(".dateee").value;

  const row = document.querySelector(".tableRow.editing");

  if (!row) {
    alert("No row selected for update");
    return;
  }

  const cells = row.querySelectorAll('td');
  cells[0].textContent = inputFieldSpend;
  cells[1].textContent = inputSelect;
  cells[2].textContent = inputDate;

  document.querySelector(".inputData").value = "";
  document.querySelector(".select").value = "";
  document.querySelector(".dateee").value = "";

  row.classList.remove("editing");
  addBtn.style.display = "block";
  updateBtn.style.display = "none";
});

// category filter here------------------------------------------

categoryFilter.addEventListener("change", (e) => {
  const selectedCategory = e.target.value.toLowerCase();

  const tableRows = document.querySelectorAll(".tableRow");

  tableRows.forEach((row) => {
    const categoryCell = row.querySelector("td:nth-child(2)");

    if (selectedCategory === "category" || categoryCell.textContent.toLowerCase() === selectedCategory) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
});

// date filter here------------------------------------------
dateFilter.addEventListener("change", (e) => {
  const selectedDate = e.target.value;
  
  const tableRows = document.querySelectorAll(".tableRow");

  tableRows.forEach((row) => {
    const dateCell = row.querySelector("td:nth-child(3)");

    if (  dateCell.textContent === selectedDate || !selectedDate) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
});

// amount sorting here------------------------------------------
amountsort.addEventListener("click", (e) => {
  const amountsorted = document.querySelectorAll(".tableRow");
  const rowsArray = Array.from(amountsorted);

  rowsArray.sort((a, b) => {
    const amountA = parseFloat(a.querySelector("td:first-child").textContent);
    const amountB = parseFloat(b.querySelector("td:first-child").textContent);
    ascending = !ascending;
    if (ascending) {
      return amountA - amountB;
    } else {
      return amountB - amountA;
    }
  });

  amountsorted.forEach(row => row.remove());

  rowsArray.forEach(row => document.querySelector(".tbody").appendChild(row));
});

//  all data filter here ----------------------------------------------
const filterItem = () => {
  const filter = document.querySelector(".searchItem").value.toUpperCase();
  const tableRows = document.querySelectorAll(".tableRow");

  tableRows.forEach(row => {
    let found = false;
    const cells = row.getElementsByTagName("td");

    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent.toUpperCase();

      if (cellText.indexOf(filter) > -1) {
        found = true;
        break;
      }
    }

    if (found) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
};
