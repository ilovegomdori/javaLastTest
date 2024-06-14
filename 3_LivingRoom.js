var dialog;
var dialogText;
var transitionDialogShown = false; // 추가된 변수
var isTransitionDialog = false; // transitionDialogs 활성화 상태 확인

document.addEventListener("DOMContentLoaded", function() {
    var dialogArea = document.getElementById("dialog_area");
    dialog = document.getElementById("dialog");
    dialogText = document.createElement("p");
    dialogText.id = "dialog_text";
    dialogText.innerText = "어이구, 지금 일어났니?";
    dialogArea.appendChild(dialogText);
    
    dialog.style.display = "none"; // 처음에는 대화창 숨기기
    dialogText.style.display = "none"; // 처음에는 보이지 않게 설정

    // 스페이스바 또는 엔터를 눌렀을 때 대화 표시
    document.addEventListener("keydown", function(event) {
        if (event.key === " " || event.key === "Enter") {
            displayNextDialog();
        }
    });

    var dialogs = [
        "어이구, 지금 일어났니?",
        "마침 잘됐네, 집 밖에 나가서 버섯\n 좀 가져와라!",
        "점심으로 버섯 샐러드를 하려는데 \n재료가 좀 부족할 것 같아.",
        "알다시피 네 아빠가 버섯을 엄청나게\n많이 먹잖니.",
        "버섯은 버섯류 몬스터를 사냥하면\n 얻을 수 있는 거 알고 있지?",
        "버섯 몬스터들이 그다지 강한 건\n 아니지만, 몬스터를 상대할 땐 항상\n 조심하구.",
        "늦지 않게 다녀오렴~",
    ];
    var dialogIndex = 0;

    function displayNextDialog() {
        if (dialogIndex < dialogs.length) {
            dialogText.innerText = dialogs[dialogIndex];
            dialogIndex++;
        } else if (dialogIndex === dialogs.length) {
            dialog.style.display = "none";
            dialogText.style.display = "none";
        }
    }

    // ENTER 버튼 클릭 시 엔터 키 이벤트 트리거
    var enterButton = document.getElementById("tajaBtn");
    enterButton.addEventListener("click", function() {
        var event = new KeyboardEvent('keydown', {'key': 'Enter'});
        document.dispatchEvent(event);
    });
});

let player = document.querySelector('.player');
let map = document.querySelector('#game_screen');
let coordinates = document.querySelector('#coordinates');

// 플레이어의 초기 위치 설정 (중앙, 바닥)
player.style.left = '88%';
player.style.bottom = '450px'; // 바닥에서 20px 위에 위치

// 좌표 업데이트 함수
function updateCoordinates() {
    let currentX = parseInt(getComputedStyle(player).left);
    let currentY = parseInt(getComputedStyle(player).bottom);
    coordinates.textContent = `X: ${currentX}, Y: ${currentY}`;
    checkForDialog(currentX, currentY); // 대화창 표시 체크
    checkForTransition(currentX, currentY); // 페이지 전환 체크
}

// 초기 좌표 표시
updateCoordinates();

// 키보드 이벤트 리스너 추가
document.addEventListener('keydown', (e) => {
    let currentDirection = 'down';
    let currentX = parseInt(getComputedStyle(player).left);
    let currentY = parseInt(getComputedStyle(player).bottom);

    // 움직이는 거리 설정 (픽셀 단위)
    let moveDistance = 20;

    // 이동 가능한 범위 설정
    const MIN_X = 45;
    const MAX_X = 615;
    const MIN_Y = 0;
    const MAX_Y = 420;

    if (e.key === 'ArrowLeft') {
        currentDirection = 'left';
        if (currentX - moveDistance >= MIN_X) {
            player.style.left = (currentX - moveDistance) + 'px';
        }
    } else if (e.key === 'ArrowRight') {
        currentDirection = 'right';
        if (currentX + moveDistance <= MAX_X) {
            player.style.left = (currentX + moveDistance) + 'px';
        }
    } else if (e.key === 'ArrowUp') {
        currentDirection = 'up';
        if (currentY + moveDistance <= MAX_Y) {
            player.style.bottom = (currentY + moveDistance) + 'px';
        }
    } else if (e.key === 'ArrowDown') {
        currentDirection = 'down';
        if (currentY - moveDistance >= MIN_Y) {
            player.style.bottom = (currentY - moveDistance) + 'px';
        }
    }

    player.dataset.direction = currentDirection;
    player.dataset.walking = 'true';
    updateCoordinates(); // 좌표 업데이트
});

document.addEventListener('keyup', () => {
    player.dataset.walking = 'false';
});

document.getElementById("tajaBtn").addEventListener("click", function () {
    handleInput();
});

document.getElementById("tajaText").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleInput();
    }
});

function handleInput() {
    var inputText = document.getElementById("tajaText").value;
    if (inputText === "시작") {
        window.location.href = "4_MushroomTaja.html";
    }
}

function checkForDialog(currentX, currentY) {
    const TARGET_X_MIN = 292;
    const TARGET_X_MAX = 352;
    const TARGET_Y_MIN = 370;
    const TARGET_Y_MAX = 410;

    if (currentX >= TARGET_X_MIN && currentX <= TARGET_X_MAX && currentY >= TARGET_Y_MIN && currentY <= TARGET_Y_MAX) {
        dialog.style.display = "block";
        dialogText.style.display = "block";
        displayNextDialog(); // 대화 텍스트 표시
    }
}

function checkForTransition(currentX, currentY) {
    const TARGET_X_MIN = 270;
    const TARGET_X_MAX = 372;
    const TARGET_Y_MIN = 10;
    const TARGET_Y_MAX = 30;

    if (currentX >= TARGET_X_MIN && currentX <= TARGET_X_MAX && currentY >= TARGET_Y_MIN && currentY <= TARGET_Y_MAX) {
        window.location.href = "4_MushroomTaja.html";
    }
}
