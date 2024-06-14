document.addEventListener("DOMContentLoaded", function() {
    var dialogArea = document.getElementById("dialog_area");
    var dialog = document.getElementById("dialog");
    var dialogText = document.createElement("p");
    dialogText.id = "dialog_text";
    dialogText.innerText = "⋯.";
    dialogArea.appendChild(dialogText);
    
    dialog.style.display = "none"; // 처음에는 대화창 숨기기
    dialogText.style.display = "none"; // 처음에는 보이지 않게 설정

    // 3초 후에 대화창 나타나기
    setTimeout(function() {
        dialog.style.display = "block";
        dialogText.style.display = "block";
    }, 1000);

    // 스페이스바 또는 엔터를 눌렀을 때 대화 표시
    document.addEventListener("keydown", function(event) {
        if (event.key === " " || event.key === "Enter") {
            displayNextDialog();
        }
    });

    var dialogs = [
        "⋯뭐지?",
        "이상한 꿈이네...",
        "...개꿈이겠지!",
        "해가 중천이네. 바로 거실로 나가자.",
        "(방향키를 사용해 방 밖으로 나가자)"
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
player.style.left = '20%';
player.style.bottom = '380px'; // 바닥에서 20px 위에 위치

// 좌표 업데이트 함수
function updateCoordinates() {
    let currentX = parseInt(getComputedStyle(player).left);
    let currentY = parseInt(getComputedStyle(player).bottom);
    coordinates.textContent = `X: ${currentX}, Y: ${currentY}`;
    checkForTransition(currentX, currentY); // 이동할지 체크
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
    const MIN_Y = 140;
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

function checkForTransition(currentX, currentY) {
    const TARGET_X_MIN = 290;
    const TARGET_X_MAX = 370;
    const TARGET_Y = 140;

    if (currentX >= TARGET_X_MIN && currentX <= TARGET_X_MAX && currentY === TARGET_Y) {
        window.location.href = "3_LivingRoom.html";
    }
}

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
    // 추가할 입력 처리 로직
}
