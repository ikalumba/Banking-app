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
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-07-09T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-11-09T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

let accounts = [account1, account2, account3, account4];

// Creating account usernames
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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//////////////////////REDO

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  movs.forEach(function (mov, i) {
    const date = account.movementsDates[i];
    const formatMovementDate = function () {
      const date1 = new Date(date);
      const date2 = new Date();
      const daysPassed = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

      if (daysPassed === 0) return 'Today';
      if (daysPassed === 1) return 'Yesterday';
      if (daysPassed >= 2 && daysPassed < 7) return `${daysPassed} days ago`;
      if (daysPassed >= 7)
        return new Intl.DateTimeFormat(currentAccount.locale).format(date1);
    };

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${
      mov > 0 ? 'deposit' : 'withdrawal'
    }">${i + 1} ${mov > 0 ? 'deposit' : 'withdrawal'}</div>
    <div class="movements__date">${formatMovementDate()}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating the total deposits, withdrawals, interest and account balance
const displayUI = function (account) {
  const totalDeposits = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr);
  labelSumIn.textContent = totalDeposits;

  const totalWithdrawal = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = totalWithdrawal;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * currentAccount.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest;

  const accountBal = account.movements.reduce((acc, curr) => acc + curr, 0);
  console.log(accountBal);
  labelBalance.textContent = accountBal;

  displayMovements(account);
};

const displayWelcomeMessage = function (account) {
  const firstName = account.owner.split(' ').splice(0, 1).join('');
  labelWelcome.textContent = `Welcome ${firstName}!`;
};

// account1.movements.push(5000);
let currentAccount;
// Logging in
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'long',
      weekday: 'long',
    };
    const currentDate = new Intl.DateTimeFormat(currentAccount.locale).format(
      new Date()
    );
    labelDate.textContent = currentDate;
    displayUI(currentAccount);
    runTimer();
    displayWelcomeMessage(currentAccount);

    btnTransfer.addEventListener('click', function (e) {
      e.preventDefault();
      const recipientAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
      );
      const transferAmount = Number(inputTransferAmount.value);
      recipientAcc.movements.push(transferAmount);
      recipientAcc.movementsDates.push(new Date().toISOString());
      currentAccount.movements.push(-transferAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // Updating UI
      displayUI(currentAccount);

      // clear form
      inputTransferTo.value = '';
      inputTransferAmount.value = '';
    });
    btnLoan.addEventListener('click', function (e) {
      e.preventDefault();
      const reqLoanAmount = Number(inputLoanAmount.value);
      const loanLimit = Math.max(...currentAccount.movements) * 0.25;
      console.log(loanLimit);
      if (loanLimit >= reqLoanAmount) {
        setTimeout(function () {
          currentAccount.movements.push(reqLoanAmount);
          currentAccount.movementsDates.push(new Date().toISOString());

          displayUI(currentAccount);
        }, 4000);
      } else {
        alert(
          `The requested loan amount is too high, it should be at most 25% of your highest deposited amount`
        );
      }
      // clearing form
      inputLoanAmount.value = '';
    });
    btnClose.addEventListener('click', function (e) {
      e.preventDefault();
      closeAccount(currentAccount);
    });

    let sorted = false;
    btnSort.addEventListener('click', function (e) {
      e.preventDefault();
      displayMovements(currentAccount, !sorted);
      sorted = !sorted;
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
      currentAccount = '';
      labelWelcome = 'Log in to get started';
    }
  }, 1000);
};

const closeAccount = function (account) {
  const deleteUsername = inputCloseUsername.value;
  const deleteUserpin = Number(inputClosePin.value);
  if (account.username === deleteUsername && account.pin === deleteUserpin) {
    console.log('On on');
    accounts = accounts.filter(acc => acc.username !== deleteUsername);
    inputCloseUsername.value = '';
    inputClosePin.value = '';
    containerApp.style.opacity = 0;
    currentAccount = '';
  }
};
let clicked = true;
const sortMovements = function (account) {
  if (clicked) {
    clicked = false;
    const sortedMov = account.movements.slice().sort((a, b) => a - b);
    containerMovements.innerHTML = '';
    displayMovements(sortedMov);
  } else {
    clicked = true;
    containerMovements.innerHTML = '';
    displayMovements(currentAccount);
  }
};
