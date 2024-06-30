let goButton = document.getElementById("go-button");
let resatButton = document.getElementById("resat-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let gameImage = document.querySelector("img");
let count = 5; // 도전 가능한 기회 횟수

goButton.addEventListener("click", compareNum);
resatButton.addEventListener("click", () => {
  goButton.disabled = false; // 버튼 활성화
  document.getElementById("input-number").value = ""; // 입력창 초기화
  chanceArea.textContent = `기회가 5번 있음 🤗 `; // 기회창 초기화
  resultArea.textContent = "1~100 사이 숫자를 입력하세요"; // 결과창 초기화
  count = 5; // 도전 횟수 초기화
  gameImage.src = "./images/main.gif";
  pickRandomNum();
});

let computerNum = 0;
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log(`정답, ${computerNum}`);
}

pickRandomNum();

function compareNum() {
  // 사용자가 입력한 숫자와 컴퓨터의 랜덤 숫자를 비교
  // 버튼 클릭을 할 때마다 사용자가 입력한 숫자를 다시 가져와야 함
  inputNum = parseInt(document.getElementById("input-number").value, 10);
  if (inputNum < 1 || inputNum > 100 || isNaN(inputNum)) {
    resultArea.textContent = "1부터 100사이 값을 입력하세요";
    return; // 함수 종료
  }

  count--;

  if (count < 1) {
    goButton.disabled = true;
    chanceArea.textContent = `기회가 모두 소진됨`;
    resultArea.textContent = `정답은 ${computerNum} 😓`;
    gameImage.src = "./images/failed.gif";
    return;
  } else {
    chanceArea.textContent = `기회가 ${count}번 남음`;
  }

  if (computerNum > inputNum) {
    resultArea.textContent = "UP ⬆️";
    console.log("UP");
    gameImage.src = "./images/up.gif";
  } else if (computerNum < inputNum) {
    resultArea.textContent = "DOWN ⬇️";
    console.log("Down");
    gameImage.src = "./images/down.gif";
  } else if (computerNum === inputNum) {
    resultArea.textContent = "정답입니다 🔥";
    console.log("정답");
    goButton.disabled = true;
    gameImage.src = "./images/correct.gif";
  }
}
