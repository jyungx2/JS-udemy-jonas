'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // ✅ sort method
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov.toFixed(2)}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

// 💡 balance값을 transfer btn 작동코드를 위해 매개변수 변경: movements -> acc
// acc에 접근하여 acc 안에 balance property 만들어줄 것이기 때문.
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1) // only include interest which is at least above 1
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};
// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  // 우리는 이 함수에서 리턴할 밸류값을 만든 게 아니라(Return keyword 없는 이유), forEach 메소드를 이용해 단지 array(accounts)상에서 루프를 돌려준 것일뿐! => 🌱 greate use case to produce so-called side effects. (=simply do some work without returning anything.)

  // 즉, accounts에 있는 각각의 요소 (account)안에 있는 owner라는 프라퍼티를 map method로 조작하여 새로운 어레이로 출력한 값을 다시 조인하여 username이라는 새로운 property로 저장한 다음 forEach 메소드로 각각의 account object안에 넣어준 것.
  accs.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0]) // 🌱 greate use case to create a new simple array (Return something which is an array while forEach method doens't return anything.)
        .join(''))
  );

  // 📌 Arrow function 이용 예시
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcPrintBalance(account1.movements);

// updateUI function (3개의 함수를 한번에 불러오는 또 하나의 함수!!)
const updateUI = function (acc) {
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

// Event handler
let currentAccount;

// 로그인 버튼
btnLogin.addEventListener('click', function (e) {
  console.log('LOGIN'); // form 요소 안에 있는 버튼을 클릭하면 기본적으로 form이 제출되면서, 새로고침되는 게 default behavior. (💥 이때, button의 타입 attribute에 따라 또 다르긴 한데, 기본적으로 type을 명시해주지 않거나, "submit"이라고 하면 새로고침 되는 게 디폴트 ✔️) => 여기선 type=""을 굳이 명시해주지 않아 어쨌든 새로고침 일어나서 e.preventDefault()로 막은 것.
  e.preventDefault();
  // 📌 <button type="button"> : 버튼을 클릭해도 form이 제출되지 않는다.
  // 📌 <input type="submit"> : input요소가 submit타입일 경우에도 클릭시 폼이 제출되면서 새로고침 ✔️

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value.trim()
  );
  console.log(currentAccount);

  //   currentAccount && 라고 쓰는 대신에, ?(Optional chaining) 쓰자. (easier, elegant)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // Show UI
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // 아래 3개의 Display 함수를 하나의 updateUI 함수로 퉁치자!
    updateUI(currentAccount);

    // Display movements
    // displayMovements(currentAccount.movements);

    // 💡 Display balance
    // calcDisplayBalance(currentAccount);

    // Display summary
    // calcDisplaySummary(currentAccount.movements);
    // ✅ interest 비율을 acc 오브젝트마다 다르게 적용시키기 위해 movements가 아닌, acc를 파라미터로 넣어주자. => calcDisplaySummary 함수로 올라가 파라미터를 movements => acc로 변경
    // calcDisplaySummary(currentAccount);
  }
});

// 트랜스퍼 버튼
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();

  // 💡 아래 코드에서 balance값을 얻기 위해(currentAccount.balance) calcDisplayBalance 함수의 파라미터 바꿔줘야 했다.
  if (
    amount > 0 &&
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username &&
    currentAccount.balance >= amount
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  //  No need to do type coercion! cause Math.floor does it itself.
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// 클로즈버튼 (findIndex method: 명시 조건을 만족하는 가장 첫번째 요소의 인덱스를 리턴하는 함수!)
// ✅ Findindex method (Only available in ES6)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// 솔트버튼
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 강의내용
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// ✅ Map method(function)
// 1) use a function to create different new array => "functional programming"
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// 🚨 arrow function으로 쓸 때는 => 넣어주는 대신, {} Curly brackets과 Return 키워드는 빼라!!
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD); // new array (not mutating original array at all)

// 2) create a new array and then push elements into an array
const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor); // same results but different paradigms(philosophy)

// ✅ map method를 이용한 movements 설명 뽑아내기
// 이때, forEach 메소드를 이용할 수도 있겠지만, 얘같은 경우 각각의 요소에 대한 description을 한줄한줄 컨솔로 출력하는 시스템이다 보니, 그 자체가 부작용(side effect)으로 여겨짐.
// 반면, map 메소드는 모든 요소를 어레이에 담아 어레이 자체를 리턴하는 함수이다 보니,
// 각각의 Iteration안에서 요소들이 컨솔로 출력되는 사이드 이펙트가 없고, 요소 하나하나를 출력하지 않아도 되는 깔끔함 Get!
const movementsDescription = movements.map(
  (mov, i) =>
    //   const verb = mov > 0 ? 'deposited' : 'withdrew';
    //   return `Movement ${i + 1}: You ${verb} ${Math.abs(mov)}`;
    `Movements ${i + 1}: You ${mov > 0 ? 'deposted' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);

// ✅ Filter method (Only available in ES6)
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);
console.log(movements);

const withdrawl = movements.filter(mov => mov < 0);
console.log(withdrawl);

// for-of loop (push method 이용)
const depositsFor = []; // we can completely avoid this extra variabel if we use filter method.for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// ✅ reduce method
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance); // 3840

// for-of loop (+= operator 이용)
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2); // 3840

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov; // 그 다음 순회, 두번째 루프에서 acc = mov(ex. 첫번째 element)
  }
}, movements[0]);

// 🪄 Magic of Chaining Methods
// const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD); //  5522.000000000001
// 1) We should not overuse the chaining, cause chaining tons of methods one after the other, can cause a real performance issues if we have really huge arrays. So, we should try to optimize it and compress all the functionality that they do into as little methods as possible. (ex. 체이닝 메소드를 이용해 map 메소드를 쓰게 되면, 필요했던 것보다 훨씬 더 많이 쓰게 될 수도 있다..)

// 2) We should refrain from using chain methods that mutate the underlying original array. 오리지널 어레이를 아예 변형해버리는 메소드들 (ex. splice(), reverse()) 사용을 삼가자!! small application에서는 상관없지만, 큰 규모의 애플리케이션 같은 경우 되도록 피하는 것이 좋은 방법!

// ✅ Find method
// filter method와의 차이점
// 1) 어레이 전체를 리턴하는 것이 아닌, 명시한 조건을 만족한 가장 첫번째 요소만을 리턴한다.
// 2) 명시한 조건을 만족하는 요소를 모두 리턴하지 않고, 조건을 만족하는 가장 첫번째 요소만 리턴한다.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal); // -400;

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// 위의 find method로 했던 로직을 순수하게 for-of loop를 써서 짜보자.
// 🖍️ 리턴 키워드는 반드시 함수 내부에서만 사용가능!!
const findJessica = function (accounts) {
  for (const account of accounts) {
    if (account.owner === 'Jessica Davis') {
      return account;
    }
  }
};
console.log(findJessica(accounts)); // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// ✅ some & every method
// CHECK Equality
console.log(movements);
console.log(movements.includes(-130)); // true
console.log(movements.some(mov => mov === -130)); // some method를 includes()와 같이 사용하기

// SOME: CHECK Condition (하나의 요소라도 명시 조건을 만족할 때는 true!)
const anyDeposits = movements.some(mov => mov > 1500); // true
console.log(anyDeposits);

// EVERY: CHECK Condition (모든 요소가 명시 조건을 만족할 때만 true!)
console.log(movements.every(mov => mov > 0)); // false
console.log(account1.movements.every(mov => mov > 0)); // true

const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300]

// ✅ flat method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// ✅ flatMap method (only available for one-level deep flat)
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

// ✅ Array.fill (method=function)
const arr2 = [1, 2, 3, 4, 5, 6, 7];
const arr3 = new Array(1, 2, 3, 4, 5, 6, 7);
console.log(arr2, arr3);

// Empty array + fill method
const x = new Array(7); // create an empty array with length of 7.
console.log(x); //  [empty × 7]
console.log(x.map(() => 5)); // ⛔️ Not working!! [empty × 7]

// original mutate시키는 fill method 사용하자.
// sytanx: (채우고 싶은 밸류, 시작 인덱스, 미포함 마지막 인덱스 )
console.log(x.fill(1)); // [1, 1, 1, 1, 1, 1, 1]
x.fill(3, 3, 5); // [1, 1, 1, 3, 3, 1, 1] (index: 3, 4자리에 숫자 3을 채워라)
console.log(x);

console.log(arr2.fill(23, 2, 5)); // [1, 2, 23, 23, 23, 6, 7]

// ❓ 어레이 자체를 아예 처음부터 생성하고, 요소까지 programmtically 넣고 싶다면?
// ✅ Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

// map function을 불러올 때와 마찬가지로, current value(_: underscore 처리) & i 사용가능!!
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// 🛎️ quersySelector로 Html문서로부터 node 객체(리스트)를 요소 하나하나로서 갖는 어레이를 만들고 싶다면?
// 이때, querySelectorAll()함수로 가져오는 노드리스트는 🖍️어레이와 같은 구조를 가질 뿐, ❌실제 array가 아니므로❌, Map, filter, reduce와 같은 array method를 가지지 않는다!!
// 따라서 우리는 Nodelist상에서 array method를 쓰고 싶다면 일단은 진짜 어레이로 바꿔줘야 하는데,
// 이 과정에서 Array.from의 사용이 perfect. (또는 ... spread operator 사용도 가능,
// but array.from처럼 콜백함수를 바로 한꺼번에 불러올 수 없어서 추가적인 배리어블 선언이 필수)

// 💥 단, 어레이 구조는 가지므로 이전 강의였던 06-modal 예제에서 For-of loop는 사용가능했었음.
// 버튼 세개가 동일한 클래스명을 묶여져 btnsOpenModal = document.querySelectAll('.show-button')
// 보다시피 일반 array처럼 ✨length 프라퍼티✨를 불러올 수 있고, ✨각각의 요소가 인덱스 또한 가져✨ 루프 사용가능!!
// ex) for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal))

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );

  //   아래 코드를 Array.from() 함수 안에 합칠 수 있다!! => 선생님이 더 선호하는 이유.
  //   console.log(movementsUI.map(el => el.textContent.replace('€', '')));

  console.log(movementsUI);
  // 🖍️ 어레이와 같은 구조 가지는거 보이지?? (🚨위 코드 합치기 전에 출력한 것 => )
  // [div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value]

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  movementsUI2.map(el => el.textContent.replace('€', '')); // 🖍️
  console.log(movementsUI2); // => 위의 map 함수 반영되지 않고, div 뭉텅이 출력됨!!
  // => 🖍️Map 함수 씌운 곳에 바로 컨솔 때려줘야 함!!(기존 어레기가 변형되지 않고, 새로운 어레이를 출력하는 것이기 때문.)
});

/* 
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const displayMovements = function (movements, sort = false) {
  const movs = sort ? movs.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = '';
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawl';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div> `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcdisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}`;
};

const calcdisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcdisplaySummary(acc);
  calcdisplayBalance(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(
      ' '[0]
    )}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username &&
    currentAccount.balance >= amount
  ) {
    console.log('Transfer valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === inputClosePin.value
  ) {
    const index = accounts.findIndex(
      acc => currentAccount.username === acc.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputClosePin = inputCloseUsername = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sort);
  sorted = !sorted;
});
*/

/*
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawl';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} deposit</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcdisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}`;
};

const calcdisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};

const updateUI = function (acc) {
  // 1️⃣ Display movements
  displayMovements(acc.movements);

  // 2️⃣ Display balance
  calcDisplayBalance(acc);
  // 🖍️ 위에서, 더이상 movements를 함수의 파라미터로 쓰지 않고,
  // acc object으로부터 movements를 빼오는 방식으로 불러오고 있기 때문에
  // currentAccount.movements라고 쓰지 않고 currentAccount라고만 쓴다!
  // >> 단, updateUI라는 배리어블로 따로 함수를 만들었을 때는, 함수 자체가
  // 독립적이기 때문에 이제는 파라미터를 acc로 바꿔도 무방!

  // 3️⃣ Display summary
  calcDisplaySummary(acc);
  // 🖍️ 얘도 마찬가지
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    console.log('Transfer Vaild');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  inputLoanAmount.value = '';

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
});

const overBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overBalance);

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
*/

/*
const displayMovements = function (movements, sort = false) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = '';
  // 평소엔 false로 고정, displayMovement 함수를 실행할 때는 항상 false로 고정되어
  // movements의 값들이 항상 index number(오름차순 X)으로 정렬되지만,(이때까진 밑의 솔트함수와 상관없다!)
  // sort라는 파라미터는 이 함수에서만 작동되기 때문(솔트함수는 sorted state라는 배리어블을 이용한다.)

  // 하지만, sort button을 누르는 순간, 아래의 eventlistner가 실행되어
  // displayMovements의 함수의 파라미터가 각각 currentAccount.movements /
  // sorted(디폴트값:false)의 반대인 !sorted(=true)로 설정되어, sort = true가 되어
  // movements.slice().sort((a, b) => a - b 코드가 실행된다.

  // * 당연히 처음 눌렀을 때는 항상 false->true로 설정되게 해야 하므로
  // sorted state를 맨 밑의 솔트이벤트 위에서 false를 디폴트값으로 설정해주되, 이 값은 클릭할 때마다
  // 새로 생기는 것이 아닌, preserve되어 true<->false로 계속 왔다갔다 해야 하는 값이기 때문에
  // let으로 정의해주고 함수 밖에서 정의 내려야 한다.

  // 그리고 여기서 중요한건, 솔트버튼을 한번 누르고 나서 두번째, 세번째 눌렀을 때
  // 다시 index number 순서대로 정렬되게 만들어야 하는데, 이것은 솔트버튼 함수 안에서 sorted
  // 버튼이 눌러졌을 때 디폴트값을 false로 설정한 sorted 배리어블을 true로 만들어야 가능하다.
  // 어쨌든 한번 눌러진 후에는, 더 이상 unsorted state(sorted=false)이 아닌 sorted state(sorted=true)이기 때문에
  // => sorted 라는 네임을 지어준 이유가 있다!! (상태라는 의미..)
  // 디폴트값으로 false값으로 정의된 sorted -> true로 바꿔줘야, 두번째 눌렀을 때 다시 원래대로 돌아가고
  // 세번째 눌렀을 땐 다시 오름차순으로 정의된다!.

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawl';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
*/
