let selectedSeats = [];


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

function clickSeat(seat){
    const selectedSeat = document.getElementById(`${seat.id}`)

    if (selectedSeats.includes(seat.id) != true){
        selectedSeat.style.backgroundColor = "#8B008B";
        selectedSeats.push(selectedSeat.id);
        console.log(selectedSeats)
        return;
    }
    
    else{
        selectedSeat.style.backgroundColor = "rgb(24, 201, 5)";
        selectedSeats = selectedSeats.filter((chosenSeat) => chosenSeat != seat.id)
        console.log(selectedSeats)
        return;
    }
    
}
