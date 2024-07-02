let goButton = document.getElementById("go-button");
let resatButton = document.getElementById("resat-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let gameImage = document.querySelector("img");
let userInput = document.getElementById("input-number");
let guessList = document.getElementById("guess-list");
let answerButton = document.getElementById("answer-button");
let history = [];
let count = 3; // 도전 가능한 기회 횟수

goButton.addEventListener("click", compareNum);
answerButton.addEventListener("click", checkAnswer);

userInput.addEventListener("focus", () => {
  userInput.value = "";
});

resatButton.addEventListener("click", resat);

let computerNum = 0;
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 30) + 1;
  console.log(`정답, ${computerNum}`);
}

pickRandomNum();

function compareNum() {
  // 사용자가 입력한 숫자와 컴퓨터의 랜덤 숫자를 비교
  // 버튼 클릭을 할 때마다 사용자가 입력한 숫자를 다시 가져와야 함
  let inputNum = parseInt(userInput.value);

  if (inputNum < 1 || inputNum > 30 || isNaN(inputNum)) {
    resultArea.textContent = "1부터 30사이 숫자를 입력하세요";
    resultArea.style.color = "red"; // 색상을 빨강색으로 변경
    return; // 함수 종료
  }

  if (history.includes(inputNum)) {
    resultArea.textContent = "이미 입력한 숫자이므로 다른 숫자를 입력하세요";
    return;
  }

  // 위 조건들을 통과하면, chance 를 깎음
  count--;

  // 입력받은 숫자에 대한 유효성 검사 후, 배열에 저장
  history.push(inputNum); // 입력 받은 숫자를 배열에 저장
  console.log(`history는 ${history}`);
  guessList.style.display = "block";
  guessList.textContent = `입력한 숫자 : ${history}`;

  if (computerNum > inputNum) {
    resultArea.textContent = "UP ⬆️";
    resultArea.style.color = "white";
    console.log("UP");
    gameImage.src = "./images/up.gif";
  } else if (computerNum < inputNum) {
    resultArea.textContent = "DOWN ⬇️";
    resultArea.style.color = "white";
    console.log("Down");
    gameImage.src = "./images/down.gif";
  } else if (computerNum === inputNum) {
    resultArea.textContent = "정답입니다 🔥";
    resultArea.style.color = "white";
    chanceArea.textContent = "축하한다냥 !!!";
    console.log("정답");
    goButton.disabled = true;
    gameImage.src = "./images/correct.gif";
    return;
  }

  if (count < 1) {
    goButton.disabled = true;
    chanceArea.textContent = `이제 게임 끝났다냥`;
    resultArea.textContent = `정답은 ${computerNum} 😓`;
    resultArea.style.color = "white";
    gameImage.src = "./images/failed.gif";
    return;
  } else {
    chanceArea.textContent = `기회가 ${count}번 남았다냥`;
    console.log(`기회가 ${count}번 남음`);
  }
}

function checkAnswer() {
  if (answerButton.textContent === "Answer") {
    // 버튼의 텍스트가 Answer 인 경우
    answerButton.textContent = `${computerNum}`;
  } else {
    answerButton.textContent = "Answer";
  }
}

function resat() {
  goButton.disabled = false; // 버튼 활성화
  document.getElementById("input-number").value = ""; // 입력창 초기화
  chanceArea.textContent = `기회가 3번이나 있다냥 🤗 `; // 기회창 초기화
  resultArea.textContent = "고양이가 생각하는 숫자를 맞혀보세요"; // 결과창 초기화
  resultArea.style.color = "white";
  count = 3; // 도전 횟수 초기화
  gameImage.src = "./images/main.gif";
  history = []; // 배열도 초기화
  guessList.textContent = ""; // 입력한 숫자들 초기화

  answerButton.textContent = "Answer";
  pickRandomNum();
}
