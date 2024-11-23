function CreateBox() {
  var boxes = " ";
  var no = 100;
  var inc = -1;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      x = i * 47;
      y = j * 47;
      boxes += `<div class='box' id="b_${no}" style='margin: ${x}px ${y}px'></div>`;
      no += inc;
    }
    if (i % 2 == 0) {
      no -= 9;
    } else {
      no -= 11;
    }
    inc = -inc;
  }
  document.querySelector(".board").innerHTML = boxes;
}
function setBox(id, color) {
  document.getElementById(
    id
  ).innerHTML = `<div class='cir' style='background:${color}'></div>`;
}
function deleteBox(id) {
  document.getElementById(id).innerHTML = " ";
}
CreateBox();
/*------------------------------------*/
const backgroundMusic = new Audio("./Audio/Nhạc nền vui.mp3");
backgroundMusic.loop = true;
function playGame() {
  backgroundMusic.play();
  document.querySelector(".start").style.display = "none";
  document.querySelector(".luatImage").style.display = "block";
}
function Luat() {
  document.querySelector(".luatImage").style.display = "none";
  document.querySelector(".menu").style.display = "block";
  document.querySelector(".game-frame").style.display = "block";
}
function startPos() {
  if (isSinglePlayer == true) {
    setBox("b_1", "black");
  }
  if (isSinglePlayer == false) {
    if (pos1 === pos2) {
      setBox("b_1", "linear-gradient(45deg, black, orange)");
    } else {
      setBox("b_1", "orange");
    }
  }
}
let isSinglePlayer = true;
document.querySelector(".play1").addEventListener("click", startPlay1);
function startPlay1() {
  isSinglePlayer = true;
  document.querySelector(".restartgame").style.display = "block";
  document.querySelector(".remodel").style.display = "block";
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".start").style.display = "none";
  document.querySelector(".TungXucXac").disabled = false;
  document.querySelector(".TungXucXac").onclick = function () {
    rotateDice();
  };
  startPos();
}
document.querySelector(".play2").addEventListener("click", startPlay2);
function startPlay2() {
  isSinglePlayer = false;
  document.querySelector(".restartgame").style.display = "block";
  document.querySelector(".remodel").style.display = "block";
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".start").style.display = "none";
  document.querySelector(".TungXucXac").disabled = false;
  // beginPlayer = 1;
  document.querySelector(".TungXucXac").onclick = function () {
    rotateDice1();
  };
  startPos();
}
/*--------------------------------------------------*/
/*-------------------------------*/
var ladders = [
  [4, 14],
  [9, 31],
  [21, 42],
  [28, 84],
  [51, 67],
  [72, 91],
  [80, 99],
];
var snakes = [
  [17, 7],
  [54, 34],
  [62, 19],
  [64, 60],
  [87, 36],
  [93, 73],
  [95, 75],
  [98, 79],
];

let timeoutIds = [];

function reset_move(move) {
  if (move > 0) {
    const timeoutId = setTimeout(() => {
      if (pos >= 1) {
        deleteBox("b_" + pos);
      }
      pos--;
      setBox("b_" + pos, "black");
      move--;
      reset_move(move);
    }, 700);
    timeoutIds.push(timeoutId);
  }
}

var pos = 1;

function playMove(move) {
  if (move > 0) {
    const timeoutId = setTimeout(() => {
      deleteBox("b_1");
      if (pos > 1) {
        deleteBox("b_" + pos);
      }
      pos++;
      if (pos >= 100) {
        alert("Chúc mừng bạn đã chiến thắng.");
        return;
      }
      setBox("b_" + pos, "black");
      move--;
      playMove(move);
      if (move == 0) {
        document.querySelector(".box-quest").style.display = "block";
      }
      if (move == 0) {
        check(ladders);
        check(snakes);
      }
    }, 700);
    timeoutIds.push(timeoutId);
  }
}

function rotateDice() {
  document.querySelector(".TungXucXac").disabled = true;
  document.querySelector(".dice").classList.add("anm");
  dice_value = parseInt(Math.random() * 6) + 1;
  //dice_value = 4;
  LIST = [
    [0, 0, 0],
    [-90, 0, 0],
    [0, 90, 0],
    [0, -90, 0],
    [90, 0, 0],
    [180, 0, 0],
  ];
  x = LIST[dice_value - 1][0];
  y = LIST[dice_value - 1][1];
  z = LIST[dice_value - 1][2];
  const timeoutId = setTimeout(() => {
    document.querySelector(".dice").classList.remove("anm");
    document.querySelector(
      ".dice"
    ).style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
    playMove(dice_value);
    document.querySelector(".TungXucXac").disabled = false;
  }, 3000);
  timeoutIds.push(timeoutId);
}
// /*---------------------------------------*/
function check(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == pos) {
      document.querySelector(".box-quest").style.display = "none";
      setTimeout(() => {
        if (pos >= 1) {
          deleteBox("b_" + pos);
        }
        pos = data[i][1];
        setBox("b_" + pos, "black");
      }, 1000);
    }
  }
}
function check1(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == pos1) {
      document.querySelector(".box-quest").style.display = "none";
      setTimeout(() => {
        if (pos1 >= 1) {
          deleteBox("b_" + pos1);
        }
        pos1 = data[i][1];
        setBox("b_" + pos1, "black");
      }, 1000);
    }
  }
}
function check2(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == pos2) {
      document.querySelector(".box-quest").style.display = "none";
      setTimeout(() => {
        if (pos2 >= 1) {
          deleteBox("b_" + pos2);
        }
        pos2 = data[i][1];
        setBox("b_" + pos2, "orange");
      }, 1000);
    }
  }
}
var pos1 = 1;
var pos2 = 1;
var beginPlayer = 1;
function playMove1(move) {
  //deleteBox("b_1");
  if (move > 0) {
    const timeoutId = setTimeout(() => {
      if (beginPlayer === 1) {
        deleteBox("b_1");
        if (pos1 > 1) {
          deleteBox("b_" + pos1);
        }
        pos1++;
        if (pos1 >= 100) {
          alert("Chúc mừng Player1 đã chiến thắng.");
          return;
        }
        setBox("b_" + pos1, "black");
        if (pos2 >= 1) setBox("b_" + pos2, "orange");
      } else {
        deleteBox("b_1");
        if (pos2 > 1) {
          deleteBox("b_" + pos2);
        }
        pos2++;
        if (pos2 >= 100) {
          alert("Chúc mừng Player2 đã chiến thắng.");
          return;
        }
        setBox("b_" + pos2, "orange");
        setBox("b_" + pos1, "black");
      }
      move--;
      playMove1(move);
      if (move === 0) {
        document.querySelector(".box-quest").style.display = "block";
      }
      if (move === 0) beginPlayer = beginPlayer === 1 ? 2 : 1;
      if (move === 0) {
        check1(ladders);
        check1(snakes);
        check2(ladders);
        check2(snakes);
      }
    }, 700);
    timeoutIds.push(timeoutId);
  }
}

function rotateDice1() {
  document.querySelector(".TungXucXac").disabled = true;
  document.querySelector(".dice").classList.add("anm");
  dice_value = parseInt(Math.random() * 6) + 1;
  //dice_value_1 = 1;
  LIST = [
    [0, 0, 0],
    [-90, 0, 0],
    [0, 90, 0],
    [0, -90, 0],
    [90, 0, 0],
    [180, 0, 0],
  ];
  x = LIST[dice_value - 1][0];
  y = LIST[dice_value - 1][1];
  z = LIST[dice_value - 1][2];
  const timeoutId = setTimeout(() => {
    document.querySelector(".dice").classList.remove("anm");
    document.querySelector(
      ".dice"
    ).style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
    playMove1(dice_value);
    document.querySelector(".TungXucXac").disabled = false;
  }, 3000);
  timeoutIds.push(timeoutId);
}

let questions = [];

// Hàm để tải câu hỏi từ file JSON
function loadQuestions() {
  fetch("quest.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      displayRandomQuestion(); // Hiển thị câu hỏi ngẫu nhiên đầu tiên
    })
    .catch((error) => console.error("Error loading JSON:", error));
}

// Hàm để hiển thị câu hỏi ngẫu nhiên
function displayRandomQuestion() {
  if (questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionElement = document.querySelector(".quest");
    const answerButtons = document.querySelectorAll(".answer-button");

    // Cập nhật câu hỏi ngẫu nhiên
    const randomQuestion = questions[randomIndex];
    questionElement.textContent = randomQuestion.question;

    // Cập nhật các đáp án
    randomQuestion.options.forEach((option, i) => {
      answerButtons[i].textContent = option;
      answerButtons[i].onclick = () =>
        checkAnswer(option.charAt(0), randomQuestion.answer); // Lấy ký tự đầu làm đáp án
    });
  }
}

// Hàm để kiểm tra đáp án
function checkAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    alert("Chúc mừng bạn đã trả lời đúng.");
    document.querySelector(".box-quest").style.display = "none";
  } else {
    alert("Bạn đã trả lời sai. Bạn sẽ bị phạt.");
    document.querySelector(".box-quest").style.display = "none";
    if (isSinglePlayer == true) {
      reset_move(dice_value);
    } else {
      reset_move_1(dice_value);
    }
  }

  // Hiển thị câu hỏi ngẫu nhiên tiếp theo
  displayRandomQuestion();
}

// Hàm đi lùi cho chế độ chơi hai người
function reset_move_1(move) {
  // Nếu là lượt của người chơi 1
  if (beginPlayer == 2) {
    if (move > 0) {
      const timeoutId = setTimeout(() => {
        if (pos1 > 1) {
          deleteBox("b_" + pos1);
          pos1--;
          setBox("b_" + pos1, "black");
          if (pos >= 1) setBox("b_" + pos2, "orange");
        }
        move--;
        reset_move_1(move);
      }, 700);
      timeoutIds.push(timeoutId);
    }
  }
  if (beginPlayer == 1) {
    if (move > 0) {
      const timeoutId = setTimeout(() => {
        if (pos2 > 1) {
          deleteBox("b_" + pos2);
          pos2--;
          setBox("b_" + pos2, "orange");
          setBox("b_" + pos1, "black");
        }
        move--;
        reset_move_1(move);
      }, 700);
      timeoutIds.push(timeoutId);
    }
  }
}
// Gọi hàm loadQuestions khi trang được tải
window.onload = loadQuestions;

function restartGame() {
  clearAllTimeouts();
  pos = 1;
  pos1 = 1;
  pos2 = 1;
  beginPlayer = 1;
  document.querySelector(".box-quest").style.display = "none";
  document.querySelector(".start").style.display = "block";
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".game-frame").style.display = "none";
  for (let i = 1; i <= 100; i++) {
    deleteBox("b_" + i);
  }
  document.querySelector(".TungXucXac").disabled = true;
  document.querySelector(".restartgame").style.display = "none";
  document.querySelector(".remodel").style.display = "none";
  document.querySelector(".dice").style.transform =
    "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  document.querySelector(".dice").classList.remove("anm");
  CreateBox();
}
function resModel() {
  clearAllTimeouts();
  pos = 1;
  pos1 = 1;
  pos2 = 1;
  beginPlayer = 1;
  document.querySelector(".box-quest").style.display = "none";
  document.querySelector(".menu").style.display = "block";
  for (let i = 1; i <= 100; i++) {
    deleteBox("b_" + i);
  }
  document.querySelector(".TungXucXac").disabled = true;
  document.querySelector(".restartgame").style.display = "none";
  document.querySelector(".remodel").style.display = "none";
  document.querySelector(".dice").style.transform =
    "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  document.querySelector(".dice").classList.remove("anm");
  CreateBox();
}
function clearAllTimeouts() {
  while (timeoutIds.length > 0) {
    const timeoutId = timeoutIds.pop();
    clearTimeout(timeoutId);
  }
}
