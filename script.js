function displayChoiceArea(){
    const choiceArea = document.getElementById("choice-area");
    const overlay = document.getElementById("overlay");
    choiceArea.style.display = "block";
    overlay.style.display = "block";
}

function closeChoiceArea(){
    const choiceArea = document.getElementById("choice-area");
    choiceArea.style.display = "none";
    overlay.style.display = "none";
}
