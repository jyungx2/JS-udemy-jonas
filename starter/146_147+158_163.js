'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// 146. PROJECT: "Bankist" App
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

// 147. Creating DOM Elements
// 1. Instead of working with global variables, start passing the data
// that function needs actually into that function. It's a good practice
// to pass the data into a function instead of having this function work
// with a global variable. It would work as well but it's a lot better to
// pass that data directly into a function. Get used to this kind of approach!
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // 밑에서 insertAdjacentHTML로 html코드를 insert한 건,
  // old html을 건드리지 않고 그냥 추가만 한 것!
  // 💡 따라서 가장 먼저 해야할 것은 위와 같은 empty the entire container이다.
  // and only then we start adding new elements.
  // just like we also used text content = empty string.
  // ❌ 이 innerHTML method is a little bit simliar to textContent method.
  // 차이점은 HTML은 all the HTML tags 모든 것을 리턴하는 반면, textContent는 간단하게 text itself를 리턴한다.
  // ex) picgame : .textContent = '' ❌

  // 163. Sorting Arrays : sort button을 누르면 '밑에서부터' ascending order로 정렬된다.
  // (because we are starting to display these movements from the bottom up.)
  // 1. 일단 위의 함수의 파라미터에 sort parameter를 추가한다.
  // 이때, 클릭하지 않으면 정렬되지 않도록 하는게 기본값이기 때문에 디폴트 값을 false로 해놓고,
  // sort가 true or false냐에 따라 movements를 order할거냐 말거냐가 결정될 것이다.

  // 2. 만약 movements에 sort method를 바로 씌워주면 실제 account object에 있는
  // actual values이 ascending order(최소:위->최대:밑)로 정렬될 것 -> 💥우리가 원하는 건 보여지는 순서가
  // 달라지는거지 실제 어레이에 있는 movements 값들의 순서를 바꾸는게 아니다!💥
  // (All we want is to display a sorted movements array
  // but we do not want to sort the original underlying data.
  // so we simply take a copy of movements array and sort that.)

  // 3. 따라서 sort = true면, 일단 movements 어레이에 있는 값들을 🖍️slice method로
  // copy한 후, 🖍️copy한 어레이에 sort method를 씌워서 정렬(오름차순)해줄 것이다.
  // simply take a copy of the movements array and sort that.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // >> 밑에 forEach method를 씌운 movements > movs 로 바꿔줘야 한다.
  // >> LECTURE(맨 밑 부분)으로 가서 btnSort(솔트버튼)을 클릭버튼을 누르면 이 작업이
  // 일어나게끔 이벤트리스너로 함수를 불러오자!

  // 💥 이해 겁나 안돼서 추가 설명 !!!!!!💥
  // 평소엔 false로 고정, displayMovement 함수를 실행할 때는 항상 false로 고정되어
  // movements의 값들이 항상 index number(오름차순 X)으로 정렬되지만,(이때까진 밑의 솔트함수와 상관없다!)
  // sort라는 파라미터는 이 함수에서만 작동되기 때문(솔트함수는 sorted state라는 배리어블을 이용한다.)

  // 하지만, sort button을 누르는 순간, 아래의 eventlistner가 실행되어
  // displayMovements의 함수의 파라미터가 각각 currentAccount.movements /
  // sorted(디폴트값:false)의 반대인 !sorted(=true)로 설정되어, sort = true가 되어
  // movements.slice().sort((a, b) => a - b) 코드가 실행된다.

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
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    // 💡 위에 정의한 html을 실제 html에 적용시키기 위해서
    // insertAdjacentHTML 방법을 Movement element에 불러온다.
    // 근데 이 movement elements들은 이미 선생님이 위에서
    // 48 code: containerMovements로 다 선택해놓음!

    // ✅ insertAdjacentHTML(first, second) method -> very simple, straightforward !
    // 1. first string is the position in which we want to attach the HTML.
    // 👉 4 types: beforebegin / afterbegin / beforeend / afterend
    // 📍 afterbegin: parent element 시작하고 나서 바로 뒤에 new child element를 삽입하고 싶다.
    // 2. second string is the string containing the HTML that we want to insert.

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // *오래된 것들을 기준으로 새로운 element들이 어디로 가냐의 문제~~~
    // -> 여기서 나는 새로운 movement 엘러먼트들이 위로 쌓이게 하고 싶기 때문에 afterbegin을 써야한다.
    // beforeend를 쓴다면 순서가 반대로 됨.

    // 새로운 것들을 오래된 것보다 위에 쌓고 싶다면(current) afterbegin을 쓰고,
    // 새로운 것들을 뒤로 보내고 싶다면 beforeend를 써라.
    // 만약, 'beforeend'라고 한다면, any new child element(새로 만들어지는 것)들이 맡으로 쌓이게 된다.
    // >> 우리가 원하는 건 🔥older element들이 밑으로 쌓이고 그 위에 (나중에) new elements🔥들이 쌓이게 되는 것이므로
    // 'afterbegin'을 써야 한다!~ (💥begin after💥 the older elements)
    // 즉, 새로운 것들이 나중에 보이는 것이므로 afterbegin of the parent elements를 뜻하는 afterbegin을 써야함..

    // 🍀 Meaning
    // - beforebegin: Before the element itself.

    // - afterbegin (of the parent elements): Just inside the element, before its 🔥first child.
    // parent(old) - child(new) >> 새로운 것들이 나중에 보이도록.. >> 새로운 것들이 뒤에 쌓이도록..
    // I want to insert the new child elements right 🔥after the beginning🔥 of the parent elements.

    // - beforeend (of the parent elements): Just insdie the element, after its 🌟last child.
    // child(new) - parent(old) >> 새로운 것들이 먼저 보이도록.. >> 새로운 것들이 새치기 하도록...
    // I want to insert the new child elements right 🌟before the ending🌟 of the parent elements.

    // - afteend: After the element itself.
  });
};
// displayMovements(account1.movements); 1️⃣
// console.log(containerMovements.innerHTML);

// 153. The reduce method
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // object(= acc <= currentAccount)에 balance라는 프라퍼티를 하나 추가하는 것
  // 근데 이때 movements를 다 더한 값이 balance라고 정의해놓는 것인데 이때는 Const로 정의할 필요없다!!
  // (그냥 오브젝트에 파라미터 하나 추가하는 것이므로 acc라는 account object에 .으로 추가할 수 있음)
  labelBalance.textContent = `${acc.balance}€`;
  // return acc.balance; 🖍️
};
console.log(calcDisplayBalance(account1)); // undefined
// >> 위의 밸런스 계산함수는 단지 balance라는 프라퍼티를 reduce 방법으로 다 더해서 만들어놓은 것이지,
// 이 값을 직접적으로 리턴하진 않음!! (🖍️ 따로 return acc.balance라고 써주지 않는이상 컨솔 상에 출력 X)

// 155. The Magic of Chaining Methods
const calcDisplaySummary = function (acc) {
  // movements > acc로 바꿔줌 = 여러 엘러멘트를 갖고 있는 array임
  // 💫 interestRate가 account(사용자)마다 다르기 때문에 interest property에 접근하려면
  // whole object인 account로 써줘야 하기 때문!
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  // there's no need for the negative sign, so let's take the absolute value.

  const interest = acc.movements
    .filter(mov => mov > 0)

    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // let's say the bank introduces a new rule.
      // now the bank only pays an interest if that interest is at least 1 Euro.
      // Only if one interest is at least 1, only then it will be added to interest total.
      console.log(arr);
      return int >= 1; // 🔦interest가 1€가 안되는 것들은 exclude,🔦 1€ 이상인 것만 내보낸다! (=0.84€)
    }) // 그러면 값이 59.4로 바뀌는데, 그 이유는 기존 interest였던 60.24€에서 0.84€만큼 빠졌기 때문!
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements); 3️⃣

// 151. Computing Username
const createUsernames = function (accs) {
  // accs = accounts => 'array' :object 모음집 (각각의 오브젝트에 property 하나 추가할 것)
  accs.forEach(function (acc) {
    // -> forEach는 array안의 요소들을 내가 만든 함수에
    // 차례로 넣어서 '하나의 값'을 생성하도록 할 수 있는 방법.
    // map/filter method처럼 어레이 -> 어레이로 반환하는 것이 아니라 reduce 처럼 하나의 값을 출력.
    // accounts array에 forEach method(또 다른 함수를 불러오는 higher order function) 적용
    acc.username = acc.owner
      .toLowerCase()
      .split(' ') // ['sarah', 'smith'] >> owner property로부터  array 또 생성
      .map(name => name[0]) // owner array(?)에 map method 적용(arrow function)
      .join(''); // 다시 array -> string으로 바꿈
  });
};
createUsernames(accounts);
console.log(accounts);

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

// 158. Implementing Login
// Event handler
let currentAccount; // ❗️

btnLogin.addEventListener('click', function (e) {
  // 💡 Prevent form from submitting
  e.preventDefault();
  // ❓ button = form element, submit button을 클릭할 때, 💥페이지가 reload되는 게
  // HTML에서는 default behavior이다.💥 즉, 저장되지 않고 자꾸 새로만 페이지가 생성되는 것.
  // 이걸 안 쓰고 console.log('LOGIN')을 쓰면, 누를 때마다 LOGIN이 컨솔상에서 반짝했다 사라지며
  // 축적되지 않는다.(즉 정보가 저장되지 않음) 디폴트를 무시하라고 하면 LOGIN이 누른 횟수에 비례하여
  // 숫자가 올라가며 1-2-3-4-5-6...페이지가 reload되지 않는다! (-> 근데 뭐때문에 이래야하지?)
  // 따라서 we need to stop that from happening.
  // for that, we need to actually give this function "event parameter(e)."

  // 🚩 To lock the user actually in, we need to 🌟find the account from
  // the accounts array with the username🌟 that the user inputted.
  // accounts라는 어레이 안에는 여러 개의 오브젝트들이 존재,
  // 여기서 한 가지 object만 뽑는 것이므로 console 상에서 오브젝트로 출력.
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); // 로그인할 때 입력한 유저네임 값이 account object에 있는 username property value와
  // 같다면, 그 값을 출력해라! ❗️그런데 이때, currentAccount value는 이 함수 밖에서/
  // 정의되어야 한다. 왜냐하면 이 함수 말고도, 후에 다른 함수에서도 쓰일 것이기 때문
  // 예를 들어, 돈을 transfer할 때, we need to know from which account that
  // money should actually go.
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // 💡 아이디나 비번을 잘못 쳤거나 빈칸으로 남겨두고 클릭했을 때, 에러가 발생하지
    // 않도록 만들기 위한 작업 - 💢no error, all we get here is the 'undefined.'💢
    // 1. ?.(optional chaining): pin property will only be read
    // ☝️in case that the current account here actually exists.
    // 물론, currentAccount && currentAccount.pin이라고 해도 되지만 이 방법이 훨씬 간편하고, elegant하다!
    // 2. inputClose.value = will always be a string! => Number 씌워주기

    // 0️⃣ Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] // Jiyoung Lee에서 Jiyoung만!
    }`;
    containerApp.style.opacity = 100; // 💡 로그인하면 앱 화면을 get it back to visible.

    // 🚩 이전 강의에서 이미 계산해놓은 balance/movement/summary 코드를 여기다 옮기자!
    // >> because we don't want to call these functions right in the beginning,
    // when out script is loaded. (로그인할 때만 나타나도록 하고 싶기 때문에)
    // we only want to calculate and display the balance, movements and the summary.

    // 💡 Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // input field를 빈칸으로 만들어주고,
    inputLoginPin.blur(); // blur function(or method):
    // cursor가 더이상 인풋 필드에서 blinking하지 않고 사라짐

    // // 1️⃣ Display movements
    // displayMovements(currentAccount.movements);

    // // 2️⃣ Display balance
    // calcDisplayBalance(currentAccount);
    // // 🖍️ 위에서, 더이상 movements를 함수의 파라미터로 쓰지 않고,
    // // acc object으로부터 movements를 빼오는 방식으로 불러오고 있기 때문에
    // // currentAccount.movements라고 쓰지 않고 currentAccount라고만 쓴다!
    // 💎 currentAccount : 내가 로그인한 하나의 account 계정(movements 어레이를 담는 object)

    // // 3️⃣ Display summary
    // calcDisplaySummary(currentAccount);
    // // 🖍️ 얘도 마찬가지

    // 💡 Update UI
    // 위의 세가지 코드는 Transfer button 코드 짤 때도 필요하므로 아예 따로
    // 함수를 정의해서 깔끔하게 하나로 쓰자! (중복코드 지양)
    updateUI(currentAccount);
  }
}); // we need to take the value property(check out 'Guess my number game'
// section where we also read the value out of an input field)

// 159. Implementing Transfers
btnTransfer.addEventListener('click', function (e) {
  // 💡 Prevent form from submitting
  e.preventDefault(); // tranfer button 또한 로그인 버튼처럼 form element이기
  // 때문에 클릭하면 page가 reload되는게 디폴트값, 따라서 이 함수?방법?을 적용시켜줘야 함!
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  ); // username만 쓰는 건 helpful X => object에서 username을 찾아와야함.
  // => method 사용. here we are looking for the account with the
  // username, which is equal to debts? input at username.

  // 💡 Clear input fields // 아래의 if 절과 아무 상관이 없다! 즉, 이프절 안에 써주면 안된다.
  // 조건을 충족해야 빈칸으로 만드는게 아니라, 버튼만 클릭하기만 하면 사라지게 하고 싶기 때문.
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && // 보내는 금액이 0보다 높고,
    receiverAcc && // 받는 사람의 계정이 존재하고, >> 밑의밑의 줄에서 receiverAcc?.라고
    // 써주긴 했어도 써줘야 하는 이유 : 이상한 계정의 네임을 쓰면 Transfer valid가 출력되기 때문
    // 이상한 계정의 유저네임 = undefeind은 당연히 현재 계정의 유저네임과 다르므로 True가 나와
    // 마지막 컨솔이 출력되는 것, 근데 출력되면 안된다 ! 알다시피, 받는 사람의 계정은 존재하지 않기 때문에.
    // 따라서 receiverAcc
    currentAccount.balance >= amount && // 총 자금이 보내는 금액보단 많고,
    receiverAcc?.username !== currentAccount.username // 받는 사람이 '보내는 사람'이 아니면,
  ) {
    console.log('Transfer valid');
    // 💡 Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // 💡 Update UI
    updateUI(currentAccount);
  }
});

// 161. some and every
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// ☝️ includes: Equality
console.log(movements.includes(-130)); // true
// 🚩 'includes' returns true if "any value" in the array is exactly equal to -130.
// This is essentially testing for equality. It checks only for equality.
// But what if we wanted to test for a "condition" instead?
// 👉 SOME & EVERY method

// ☝️ SOME: Condition
console.log(movements.some(mov => mov === -130)); // true
// > but we could use includes method.
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits); // true (3000)
// If there's any value for which this condition is true,
// then the some method will return true.

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // if at least one of the elements in the movements array has this condition,
    // all of this will become true.

    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
// movement에 있는 값중에 가장 큰 값은 3000, 따라서 30000이 가장 큰 대출금이다.
// 예를 들어, 5000을 대출한다면, 5000이 desposit으로 찍혀 총 자금은 +5000이 될 것이고,
// in 부분도 이만큼 늘어나겠지, 그렇다면 5000이라는 값이 movements에 push 됐으므로
// 그 다음 번엔 50000, 500000 ... 계속 deposit할 수 있는 것.. (이게 맞는 시스템인가?ㅎ)

// ☝️ EVERY
// 🚩 'every' only returns true if "all of the elements" in the array satisfy the condition that we pass in.
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // true

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300]

// 162. f and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1)); // [Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]
// 💡 'flat method' only goes 🖍️one level deep when flattening the array.
// 1,2,3 was inside the first level of nesting. so it was taken out
// and it's now in the main array. but then we still have [1,2] & [5,6] nested array in there.
// flat is running with the 1 here as the depth. If we run it with 1, which is the default.
// but we can go 2 levels deep. and we get the same result as before.

// 💡 모든 account(object)의 movement(property, array)에 있는 element들을 더하고 싶다면?
// 1️⃣ flat
// 1. 단계별로 하나씩 진행
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat(); // we have only one level of nesting. So there's not even a need for any parameter(arguement).
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance); // we get the final result of adding up all of these values.

// 2. 한번에 진행
const overalBalance = accounts
  .map(acc => acc.movements) // (4) [Array(8), Array(8), Array(8), Array(5)]
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); // 17840

// 2️⃣ flatMap
// 1) FlatMap method essentially combines a map and a flat method.
// >> So it needs the 💫same callback as a map method.💫
// 2) Only goes '1 level' deep and 🚨we cannnot change it!🚨
// >> So if you need to go deeper than just 1 level, you still need to use the flat method.

// 🖍️ Keep these two in mind, whenever you find yourself in a situation
// where you have nested the race and need to work with them.

const overalBalance2 = accounts
  .flatMap(acc => acc.movements) // since flat map also does mapping,
  // it needs to receive 💫exactly the same callback as a map method.💫
  // this is essentially a map method, all it does is in the end, it then flattens the result.

  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); // 17840 (same result)

// 163. Sorting arrays
// 1️⃣ String
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']
// we get our array nicely sorted. (alphabetically from A to Z)
console.log(owners); // ['Adam', 'Jonas', 'Martha', 'Zach']
// 💥 Also mutates the original array. (have to be very careful with this method.)

// 2️⃣ Number
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70]
// ❗️ sort method does the sorting based on 'strings'!!
// 만약 숫자가 아닌 스트링이었다면 make sense. (-1,4,6 / 1,2,3,4,7)
// ✅ we can fix this by passing in a compare 💫callback function💫 into the sort method.

// 💡 How the sort callback function works.💡
// ▶️ return < 0, A, B (⚡️keep order / A will be before B)
// : 리턴값이 (-)면 순서 그대로!
// ▶️ return > 0, B, A (💥switch order / B will be before A)
// : 리턴값이 (+)면 순서 바꿔라!
// i) ascending order (갈수록 올라가는 오름차순)
movements.sort((a, b) => {
  // 💥이때, 원래 순서가 a, b 이라는 걸 명심.
  if (a > b) return 1; // a가 크고, 오름차순이면 뒤로 가야 하기 떄문에 자리 바꿔서 b, a가 돼야 함 -> 양수(1)
  if (a < b) return -1;
});

// ii) descending order (갈수록 내려가는 내림차순)
movements.sort((a, b) => {
  if (a > b) return -1; // a가 크고, 내림차순이면 앞으로 가야 하기 때문에 자리 바꾸지 말고 그 자리 -> 음수(-1)
  if (a < b) return 1;
});
// we can use this knowledge to sort our movements array in ascending order. (= from small to large numbers)
// 450, -400 => we want to sort these two numbers in ascending order.
// => -400, 450으로 switch해줘야 함 > 더 이상 A, B가 아닌, B, A
// so we need to return something that is greater than 0. >> we need to return b - a (not a - b)
// becasue that's the rule! how the sort callback function works.

// 👉 위에 장황하게 쓰는 것보다, 이렇게 arrow function을 이용해 간단하게 쓸 수 있다.
// ** a,b라고 적어놓은 이유는 원래 a,b라는 순서로 되어있고, 이 순서를 바꿀지 말지를 결정하는 거기 때문에,
// a > b 라고 가정하는 거에 대해 그렇지 않으면 어떻게 될까에 대한 의문을 가질 필요가 없다.
// ❗️왜냐면 만약 a>b가 아니라, b>a여도, 오름차순으로 하고 싶다면, a,b가 돼야하기 때문에 음수값의(순서가 바뀌지 않는)
// a-b를 써줘야 하기 때문에 !! a>b든, b>a든, 오름차순은 무조건 a-b를 써주면 되는 것!!!❗️
// a, b이라는 순서로 원래 되어 있는데, 🔥만약 이 때 a > b이고,🔥 오름차순으로 하고 싶다면 순서를 바꿔야 하기 때문에 양수값이 나오는
// a-b라고 써주면 되고, 반대로 내림차순은 a,b라는 순서를 그대로 유지하면 되기 때문에 음수값이 나오는 b-a라고 써주면 된다.

// i) Ascending order
// a > b일 때, 이 순서를(a,b -> b,a로) 바꿔야 하므로 (+)를 리턴해야 한다... 따라서 + 값인 a - b 라고 써주고,
// movements.sort((a, b) => a - b);

// ii) Descending order
// 반대로 a > b 일 때, 이 순서를 유지해야 하므로 (-)를 리턴해야 한다... 따라서 - 값인 b - a 라고 써줌으로써 똑같은 결과 출력!
// movements.sort((a, b) => b - a);

movements.sort((a, b) => a - b); // a > b일 때, a - b = (+) : switch order!
console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]
// ⚠️ const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// 여기서 a, b = 200, 450 이므로 a - b = (-) : keep order.
// 450, -400 : a - b = (+) : switch order.
// -400, -130 : a - b = (-) : keep order.
// ... 더 작은 값이 왼쪽으로, 큰 값이 오른쪽으로 이동하게 되면서 ascending order으로 sorted!

// 160. The FindIndex Method
// * find & findIndex method only work and were added to JS in ES6. (not super old browser)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // 💡 FindIndex method is similar to Find method.
    // 1) Find: returns the first "element"🖍️ that matches(true) condition that will return either true or false.
    // 2) FindIndex: returns the "index"🖍️ of the first element in the array that matches(true) this condition. no the element itself.
    // 3) .indexOf(23): if the array contains this value(괄호 안에 있는 값) or not, 단순하게 값이 있냐 없냐에 따라 true or false를 출력
    // if the array contains this value(=23) or not, if so, return the index of it.
    // if not, return -1 (I don't know why)
    // findIndex()는 아래처럼 복잡한 condition을 사용할 수 있다!
    // Both will return an index Number, but indexOf is a lot simpler.
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index); // js: 0, jd: 1, stw: 2, ss: 3로 출력 (index number)

    // 💡 Delte account
    // accounts 어레이에서 해당 인덱스 넘버를 가진 account object를 통째로 삭제!
    // 이때 해당하는 오브젝트 하나만을 삭제할 것이기 때문에 1이라고 써준다.
    accounts.splice(index, 1);
    // splice method는 적용하는 순간 바로 어레이에서 해당 element가 삭제되기 때문에
    // 따로 저장할 필요 없다! (mutates the underlying array itself, there's
    // no need to save the result of this anywhere.)

    // 💡 Hide UI
    containerApp.style.opacity = 0;
    // 불투명함을 0으로 => 불투명하지 않고, 투명하게 => 안보이게..

    // 💡 Clear input fields
    inputCloseUsername.value = inputClosePin.value = '';
    // This needs to be after the If-else statement.
    // 인풋밸류들을 이미 빈칸으로 가정하고, 커렌트 어카운트와 비교하는 것은 의미없, 즉, if 조건절이
    // 당연히 true가 아니기 때문에 어카운트를 닫지 않게 되고, 창의 변화 없으며 당연히 아무 일도 안일어남
    // 따라서 맨 밑에 써줘야 Make sense하고, 이 과정 후 지운 계정으로 다시 로그인했을 때, 아무일도 일어나지 않는다
    // Because this user no longer exists in our accounts array.
  }
});
// For example, js/1111로 로그인해서 js/1111을 Close button을
// 이용해 제거한 후, 다시 로그인하면 undefined로 출력됨 > accounts array에서
// 더 이상 발견하지 못한다는 것.
// 1. Both find and findIndex methods : were added to JS in ES6. (they will not work in super old browsers.)
// 2. get access to all the current index, and the current entire array.
// So as always, besides the current element, these other two values are also available.
// But in practice, I never found these useful.

// 163. Sorting Arrays
let sorted = false;
// 밑에 코드만 써주면, 처음에 한번 눌렀을 때는 오름차순으로 정렬이 되지만, 다시 한번 누르면
// 다시 내림차순으로 안 바뀌고, 아무 일도 안 일어난다. (we never told it to do so!)
// we will solve this by using a state variable, which will monitor if we
// are currently sorting the array or not.

// 이 배리어블은 callback function밖에 위치해야 하는데, 이유는 버튼을 누른 후에도
// value가 preserve돼야 하기 때문! 만약 안에 넣는다면, 솔트버튼을 클릭할 때마다
// 이 밸류는 새롭게 생성될 것이기 때문에 안 된다.

// 따라서 처음 기본값은 당연히 sorted 되지 않은 어레이기 때문에
// false로 저장해두고, 이 값은 클릭할 때마다 계속해서 바뀔 것이기 때문에 let으로 저장,
// 그 다음 만약 클릭한다면, !sorted=true이기 때문에 displayMovement에 있는
// 함수가 실행될 것이고, 맨 밑의 코드로 인해 sorted = true로 바뀌겠지,
// 그 다음 다시 한 번 또 누르게 된다면 !sorted = false이므로, 이때는 기존 원래 (내림차순) movements 순서🔥로 바뀌겠지.
// ⚡️ 왜냐면 우리가 위의 displayMovements 함수에서
// const movs = sort ? movements.slice().sort((a, b) => a - b) : 🔥movements;
// 이렇게 정의해놨으니까! 맨 끝에 movements는 sort = false일 때 작동되도록 맞춰놓음.

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  // ✅ displayMovements 함수 파라미터로 sorted의 디폴트값을 원래 false로 설정한 솔트 버튼을 누르면 true로 바뀌게 하는 방법!
  // Basically here, we want the opposite of sorted.
  // So that's where our 'not operator(=!)' comes in handy.
  sorted = !sorted;
  // All we need to do is to actually flip this variable.
  // ❗️we do sorted equal the opposite of sorted once again.
  // this is what then allows everything to work.
  // Otherwise, even as we would click, this sorted variable would never change.
  // So with this, each time that we click,
  // we change sorted from true to false then from false to true and so on and so forth.
});
