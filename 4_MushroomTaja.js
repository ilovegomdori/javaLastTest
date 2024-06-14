// 2_map.js

// 내려오게 할 단어의 목록을 배열로 선언.
var taja = ["달팽이", "모험가", "단풍나무", "마라탕", "냉면", "소바", "향", "모자", "곰인형", "유리", "공예", "과거", "현재", "미래", "눈사람", "강의실", "시계", "타자게임", "소떡소떡", "분무기"];

// 랜덤 이미지 목록
var images = ["img/몹_주버섯.png", "img/몹_초버섯.png", "img/몹_파버섯.png"]; // 이미지 파일 경로 수정

// 밑에 선언한 tajaContents 안에 글자로 된 Div를 넣어주게 됩니다.
var tajaContents = document.getElementById("tajaContents");

// tajaDiv를 다루기 위한 배열
var newObj = [];

// taja의 각 글자마다 top을 주기위한 배열 초기화 (글자를 내려오게 하기 위해 style 의 top을 이용할 것입니다)
var plusTop = new Array(taja.length);
for (let i = 0; i < plusTop.length; i++) {
    plusTop[i] = 0;
}

// 글자의 div 크기를 고정으로 주기 위한 변수입니다.
const TAJAWIDTH = 150;
const TAJAHEIGHT = 50;

// 그려지는 것 보다 내려오는게 간격이 더 짧게 함( setInterval의 시간 변수)
const DRAWTIME = 1000;
const DOWNTIME = 2000; // 느리게 떨어지게 조정

// 생명 변수 대신 heart 이미지를 사용
var life = 5;
var heartArray = document.getElementById("heart_array").children;

// taja배열의 index 값에 대한 변수
var idx = 0;

// 화면에 글자를 뿌려주기 위한 메서드
function drawTaja() {
    var randomPick = 0;
    var temp = null;

    // 랜덤으로 taja배열을 섞어주기 위한 for문
    for (let i = 0; i < taja.length; i++) {
        randomPick = Math.round(Math.random() * (taja.length - 1));
        temp = taja[randomPick];
        taja[randomPick] = taja[i];
        taja[i] = temp;
    }

    // 일정한 간격으로 화면에 단어를 하나씩 뿌려주기 위한 setInteval 메서드 입니다.
    var drawInterval = setInterval(function () {
        if (idx >= taja.length) {
            clearInterval(drawInterval);
            return;
        }

        var leftWidth = Math.round(Math.random() * 550);
        var tajaDiv = document.createElement("div");
        tajaDiv.classList.add("tajaWord");
        tajaDiv.style.width = TAJAWIDTH + "px";
        tajaDiv.style.height = TAJAHEIGHT + "px";
        tajaDiv.style.position = "absolute";
        tajaDiv.style.textAlign = "center";

        // 랜덤 이미지 추가
        var img = document.createElement("img");
        img.src = images[Math.floor(Math.random() * images.length)];
        img.style.width = "30px";
        img.style.height = "30px";
        tajaDiv.appendChild(img);

        var span = document.createElement("span");
        span.innerHTML = taja[idx++];
        tajaDiv.appendChild(span);

        tajaContents.appendChild(tajaDiv);

        // leftWidth 변수가 0 < leftWidth < 1200 으로 설정되어있기 때문에
        // 글자의 width값 까지 더하게 되면 tajaContents의 범위를 넘어갈 수 있습니다.
        // 그래서 그 범위를 넘어가게 되면 안넘어가게 하기 위한 재설정해주는 부분입니다.
        if (leftWidth + TAJAWIDTH >= tajaContents.offsetWidth) {
            tajaDiv.style.left = (leftWidth - TAJAWIDTH) + "px";
        } else {
            tajaDiv.style.left = leftWidth + "px";
        }

        // 각각의 tajaDiv를 다루기 위해 newObj 배열에 담는다.
        newObj.push(tajaDiv);

        // 화면에 글자가 다 뿌려지면 더 이상 글자를 뿌려주기 위한
        // setInterval() 을 중지시킨다. ( 그렇지 않으면 글자가 다 뿌려진 이후에도 계속 동작하게 됩니다.)
        if (newObj.length === taja.length) {
            clearInterval(drawInterval);
        }
    }, DRAWTIME);
}

// 글자를 내려주기 위한 메서드
function downTaja() {
    //글자가 뿌려진 이후에는 일정한 간격으로 글자를 내려줘야 합니다.
    setInterval(function () {
        for (let i = 0; i < taja.length; i++) {
            if (i < newObj.length) {
                newObj[i].style.top = plusTop[i] + "px";
                plusTop[i] += 20;
                
                // 글자가 화면 하단에 도달하면 life 감소 및 이미지 변경
                if (plusTop[i] >= tajaContents.offsetHeight) {
                    if (life > 0) {
                        heartArray[--life].style.backgroundImage = "url('img/빈하트.png')";
                    }
                    if (life === 0) {
                        document.getElementById("game_over").style.display = "block";
                        setTimeout(function() {
                            window.location.href = "4_MushroomTaja.html"; // 3초 후 3_LivingRoom.html로 전환
                        }, 3000);
                    }
                    newObj[i].remove();
                    newObj.splice(i, 1); // 배열에서도 제거
                    i--; // 배열에서 요소가 제거되었으므로 인덱스를 하나 줄임
                }
            }
        }
    }, DOWNTIME);
}

// 입력 처리
function handleInput() {
    var inputText = document.getElementById("tajaText").value;
    for (let i = 0; i < newObj.length; i++) {
        if (newObj[i] && newObj[i].querySelector("span").innerText === inputText) {
            newObj[i].remove();
            newObj.splice(i, 1);
            document.getElementById("tajaText").value = "";
            break;
        }
    }

    // 화면에 남아있는 단어가 없으면 게임 클리어
    if (newObj.length === 0 && idx >= taja.length) {
        document.getElementById("game_clear").style.display = "block";
        setTimeout(function() {
            window.location.href = "5_LivingRoom.html"; // 3초 후 5_LivingRoom.html로 전환
        }, 3000);
    }
}

// 게임 시작 전 "GAME START!" 표시 후 1초 뒤 게임 시작
function startGame() {
    document.getElementById("game_start").style.display = "block";
    setTimeout(function () {
        document.getElementById("game_start").style.display = "none";
        drawTaja();
        downTaja();
    }, 1000);
}

// 페이지 로드 후 3초 후 게임 시작
window.onload = function () {
    setTimeout(startGame, 3000);
};

document.getElementById("tajaBtn").addEventListener("click", function () {
    handleInput();
});

document.getElementById("tajaText").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleInput();
    }
});


// 코드 참고: https://m.blog.naver.com/opgj123/221443576229