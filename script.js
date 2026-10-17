"use strict";

/*
  JavaScript Midterm
  Mini Expense Tracker
*/

// ------------------------------------
// 1. SELECT DOM ELEMENTS
// ------------------------------------
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addExpenseBtn = document.getElementById("add-expense");
const resetBtn = document.getElementById("reset");
const messageBox = document.getElementById("message");
const expenseList = document.getElementById("expense-list");
const expenseCount = document.getElementById("expense-count");
const totalDisplay = document.getElementById("total");
const budgetStatus = document.getElementById("budget-status");

// ------------------------------------
// 2. APPLICATION DATA
// ------------------------------------
let expenses = [];
const budgetLimit = 500.00;

// ------------------------------------
// 3. FUNCTIONS
// ------------------------------------

// Add an expense
function addExpense() {
  const description = descriptionInput.value.trim();
  const amountValue = amountInput.value.trim();
  const category = categorySelect.value;
  
  // Convert amount to a number
  const amount = Number(amountValue);

  // Validation
  if (description === "") {
    showMessage("Please enter a description.", "error");
    return;
  }
  
  if (amountValue === "" || isNaN(amount) || amount <= 0) {
    showMessage("Please enter a valid amount greater than 0.", "error");
    return;
  }

  // Create an expense object
  const expense = {
    description: description,
    amount: amount,
    category: category
  };

  // Add to array
  expenses.push(expense);
  
  // Display success message
  showMessage("Expense added successfully!", "success");

  // Update UI and clean up
  clearForm();
  displayExpenses();
  const total = calculateTotal();
  updateBudgetStatus(total);
}

// Display messages
function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
}

// Display expenses
function displayExpenses() {
  // Clear the current list
  expenseList.innerHTML = "";

  // Update the count
  expenseCount.textContent = `${expenses.length} Expense${expenses.length === 1 ? '' : 's'}`;

  // If no expenses, show the empty message
  if (expenses.length === 0) {
    expenseList.innerHTML = '<p class="empty-message">No expenses have been added yet.</p>';
    return;
  }

  // Loop through and build the expense items
  expenses.forEach(expense => {
    const expenseItem = document.createElement("div");
    expenseItem.className = "expense-item";

    const descSpan = document.createElement("span");
    descSpan.className = "expense-description";
    descSpan.textContent = expense.description;

    const catSpan = document.createElement("span");
    catSpan.className = "expense-category";
    catSpan.textContent = expense.category;

    const amtSpan = document.createElement("span");
    amtSpan.className = "expense-amount";
    amtSpan.textContent = `$${expense.amount.toFixed(2)}`;

    expenseItem.appendChild(descSpan);
    expenseItem.appendChild(catSpan);
    expenseItem.appendChild(amtSpan);

    expenseList.appendChild(expenseItem);
  });
}

// Calculate the total
function calculateTotal() {
  let total = 0;
  
  expenses.forEach(expense => {
    total += expense.amount;
  });

  // Display rounded to 2 decimal places
  totalDisplay.textContent = `$${total.toFixed(2)}`;
  
  return total;
}

// Update budget status
function updateBudgetStatus(total) {
  if (total <= budgetLimit) {
    budgetStatus.textContent = "You are under budget.";
    budgetStatus.className = "budget-status under-budget";
  } else {
    budgetStatus.textContent = "You are over budget.";
    budgetStatus.className = "budget-status over-budget";
  }
}

// Clear the form
function clearForm() {
  descriptionInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
}

// Reset the application
function resetApp() {
  // Clear data
  expenses = [];
  
  // Clear UI elements
  clearForm();
  displayExpenses();
  
  // Reset total and budget
  const total = calculateTotal();
  updateBudgetStatus(total);
  
  // Clear messages
  messageBox.textContent = "";
  messageBox.className = "message";
}

// ------------------------------------
// 4. EVENT LISTENERS
// ------------------------------------
addExpenseBtn.addEventListener("click", addExpense);
resetBtn.addEventListener("click", resetApp);