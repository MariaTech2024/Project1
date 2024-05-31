let transactions = [];

async function fetchTransactions() {
  try {
    const response = await fetch('http://localhost:3004/transactions');
    const data = await response.json();
    if (Array.isArray(data)) {
      transactions = data;
    } else {
      transactions = [];
    }
    renderList();
    updateTotal();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    transactions = [];
    renderList();
    updateTotal();
  }
}

// Formatter for currency display with Israeli Shekels
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'ILS',
  signDisplay: 'always',
});

// DOM elements
const list = document.getElementById('transactionList');
const form = document.getElementById('transactionForm');
const status = document.getElementById('status');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');

// Event listener for form submission
form.addEventListener('submit', addTransaction);

// Function to update the total income, expense, and balance
function updateTotal() {
  const incomeTotal = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + parseFloat(trx.amount), 0);

  const expenseTotal = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + parseFloat(trx.amount), 0);

  const balanceTotal = incomeTotal - expenseTotal;

  balance.textContent = formatter.format(balanceTotal).substring(1);
  income.textContent = formatter.format(incomeTotal);
  expense.textContent = formatter.format(expenseTotal * -1);
}


// Function to render the list of transactions
function renderList() {
  list.innerHTML = '';
  status.textContent = '';

  if (transactions.length === 0) {
    status.textContent = 'No transactions.';
    return;
  }

  transactions.forEach(({ id, name, amount, date, type }) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>
      <div class="amount ${type}">
        <span>${formatter.format(type === 'income' ? amount : -amount)}</span> <!-- Display negative for expenses -->
      </div>
      <div class="action">
        <button class="delete-btn" onclick="deleteTransaction(${id})">X</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Function to delete a transaction
async function deleteTransaction(id) {
  try {
    const response = await fetch(`http://localhost:3004/transactions/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      transactions = transactions.filter(trx => trx.id !== id);
      updateTotal();
      renderList();
    } else {
      console.error('Failed to delete transaction:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
}

// Function to add a new transaction
async function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const transaction = {
    name: formData.get('name'),
    amount: parseFloat(formData.get('amount')),
    date: new Date(formData.get('date')),
    type: formData.get('type') === 'on' ? 'income' : 'expense',
  };

  try {
    const response = await fetch('http://localhost:3004/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    if (response.ok) {
      const newTransaction = await response.json();
      transactions.push(newTransaction);
      form.reset();
      updateTotal();
      renderList();
    } else {
      console.error('Failed to add transaction:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
}

// Initial fetching of transactions
fetchTransactions();