// Get references to the table and form elements
const expenseTable = document.querySelector("table:first-of-type");
const summaryTable = document.querySelector("table:last-of-type");
const addExpenseButton = document.querySelector("button");
const dateInput = document.querySelector("input[type='date']");
const nameInput = document.querySelector("input[type='text']");
const amountInput = document.querySelector("input[type='number']");

// An array to store the expenses
let expenses = [];

// A function to add a new expense to the expenses array and update the tables
const addExpense = () => {
  const date = dateInput.value;
  const name = nameInput.value;
  const amount = amountInput.value;

  expenses.push({ date, name, amount });

  updateExpenseTable();
  updateSummaryTable();
};

// A function to update the expense table
const updateExpenseTable = () => {
  let expensesHTML = "";

  expenses.forEach(expense => {
    expensesHTML += `
      <tr>
        <td>${expense.date}</td>
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
      </tr>
    `;
  });

  expenseTable.innerHTML = `
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Amount</th>
    </tr>
    ${expensesHTML}
  `;
};

// A function to update the summary table
const updateSummaryTable = () => {
  let summaryHTML = "";
  const expensesByDate = getExpensesByDate();

  Object.keys(expensesByDate).forEach(date => {
    const totalAmount = expensesByDate[date].reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    summaryHTML += `
      <tr>
        <td>${date}</td>
        <td>${totalAmount}</td>
      </tr>
    `;
  });

  summaryTable.innerHTML = `
    <tr>
      <th>Date</th>
      <th>Total Amount</th>
    </tr>
    ${summaryHTML}
  `;
};

// A function to group expenses by date
const getExpensesByDate = () => {
  const expensesByDate = {};

  expenses.forEach(expense => {
    if (!expensesByDate[expense.date]) {
      expensesByDate[expense.date] = [];
    }

    expensesByDate[expense.date].push(expense);
  });

  return expensesByDate;
};

// Add event listeners to the form elements
addExpenseButton.addEventListener("click", addExpense);
dateInput.addEventListener("change", updateSummaryTable);
