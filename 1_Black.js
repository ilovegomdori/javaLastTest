document.addEventListener("DOMContentLoaded", function() {
    var dialogArea = document.getElementById("dialog_area");
    var dialog = document.getElementById("dialog");
    var dialogText = document.createElement("p");
    dialogText.id = "dialog_text";
    dialogText.innerText = "이런⋯.";
    dialogArea.appendChild(dialogText);
    
    dialog.style.display = "none"; // 처음에는 대화창 숨기기
    dialogText.style.display = "none"; // 처음에는 보이지 않게 설정

    // 3초 후에 대화창 나타나기
    setTimeout(function() {
        dialog.style.display = "block";
        dialogText.style.display = "block";
    }, 3000);

    // 스페이스바 또는 엔터를 눌렀을 때 대화 표시
    document.addEventListener("keydown", function(event) {
        if (event.key === " " || event.key === "Enter") {
            displayNextDialog();
        }
    });

    var dialogs = [
        "대적자가 될 수 있을 만큼 큰 그릇을\n 지닌 아이인데⋯.",
        "본인은 전혀 인지하지 못하는 것\n 같네.",
        "하지만 곧 알게 될 날이 올 거야⋯.",
        "⋯.",
        "이제 일어나렴."
    ];
    var dialogIndex = 0;

    function displayNextDialog() {
        if (dialogIndex < dialogs.length) {
            dialogText.innerText = dialogs[dialogIndex];
            dialogIndex++;
        } else if (dialogIndex === dialogs.length) {
            window.location.href = "2_Room.html";
        }
    }

    // ENTER 버튼 클릭 시 엔터 키 이벤트 트리거
    var enterButton = document.getElementById("tajaBtn");
    enterButton.addEventListener("click", function() {
        var event = new KeyboardEvent('keydown', {'key': 'Enter'});
        document.dispatchEvent(event);
    });
});
