'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Isaac Kalumba',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//////////////////////REDO

const displayWelcomeMessage = function (acc) {
  const firstName = acc.owner.split(' ').splice(0, 1).join('');
  labelWelcome.textContent = `Welcome ${firstName}!`;
};
const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${
      mov > 0 ? 'deposit' : 'withdrawal'
    }">${i + 1} ${mov > 0 ? 'deposit' : 'withdrawal'}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating the total deposits
const displaySummary = function (movements) {
  const totalDeposits = movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr);
  labelSumIn.textContent = totalDeposits;

  const totalWithdrawal = movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = totalWithdrawal;

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * currentAccount.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest;
};

const displayBalance = function (movements) {
  const accountBal = movements.reduce((acc, curr) => acc + curr);
  labelBalance.textContent = accountBal;
};

console.log(new Date().toLocaleDateString());

const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

// account1.movements.push(5000);
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1;
    const currentDate = new Date().toLocaleDateString();
    labelDate.textContent = currentDate;
    displayMovements(currentAccount.movements);
    displayBalance(currentAccount.movements);
    displayWelcomeMessage(currentAccount);
    displaySummary(currentAccount.movements);
    runTimer();

    btnTransfer.addEventListener('click', function (e) {
      e.preventDefault();
      const recipientAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
      );
      const transferAmount = Number(inputTransferAmount.value);
      recipientAcc.movements.push(transferAmount);
      currentAccount.movements.push(-transferAmount);
      containerMovements.innerHTML = '';
      displayMovements(currentAccount.movements);

      // clear form
      inputTransferTo.value = '';
      inputTransferAmount.value = '';
    });
    btnLoan.addEventListener('click', function (e) {
      e.preventDefault();
      const reqLoanAmount = inputLoanAmount.value;
      const loanLimit = Math.max(...currentAccount.movements) * 0.25;
      console.log(loanLimit);
      if (loanLimit >= reqLoanAmount) {
        setTimeout(function () {
          containerMovements.innerHTML = '';
          currentAccount.movements.push(reqLoanAmount);
          displayMovements(currentAccount.movements);
        }, 4000);
      } else {
        alert(
          `The requested loan amount is too high, it should be at most 25% of your highest deposited amount`
        );
      }
      inputLoanAmount.value = '';
    });
  }

  inputLoginUsername.value = '';
  inputLoginPin.value = '';
});

/////////////////////////////////////////////////
// Get the <div> element by its id
// var timer = document.getElementById("timer");

// Set the end time to 5 minutes from now
const runTimer = function () {
  const endTime = new Date().setMinutes(new Date().getMinutes() + 5);
  // endTime.setMinutes(endTime.getMinutes() + 5);

  // Update the timer every second
  const interval = setInterval(function () {
    // Get the current time
    const now = new Date();
    // Calculate the time difference in milliseconds
    const diff = endTime - now;
    // Convert the time difference to minutes and seconds
    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff / 1000) % 60);
    // Display the timer
    labelTimer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')} `;
    // If the time is up, stop the interval and display a message
    if (diff <= 0) {
      clearInterval(interval);
      labelTimer.innerHTML = "Time's up!";
      containerApp.style.opacity = 0;
    }
  }, 1000);
};
