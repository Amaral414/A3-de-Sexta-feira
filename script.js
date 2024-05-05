let totalPrice = document.getElementById("total");
let seats = document.getElementById("seats");

let selectedSeats = [];
let purchasedSeats = [];
let total = 0;
let priorDate;
let date;
let time;

const logan = {
    session1: [["A1", "A2", "A3", "A4"], "13/06", "11:00"],
    session2: [["B1", "B2", "B3", "B4"], "13/06", "14:00"],
    session3: [["C1", "C2", "C3", "C4"], "13/06", "17:00"],
    session3: [["D1", "D2", "D3", "D4"], "13/06", "20:00"],
}

purchase();
totalPrice.textContent = `R$ ${total},00`

function displaySessions(selectedDate){
    if(priorDate != null && priorDate != selectedDate){
        document.getElementById(priorDate).style.display = "none";
    }

    date = document.getElementById(selectedDate);
    if(date.style.display == "none"){
        date.style.display = "block";
        priorDate = selectedDate;
    }
    
    else{
        date.style.display = "none";
        priorDate = selectedDate;
    }

}

function displayDateArea(){
    const dateArea = document.getElementById("date-area");
    const overlay = document.getElementById("overlay");
    dateArea.style.display = "block";
    overlay.style.display = "block";
}

function closeDateArea(){
    const dateArea = document.getElementById("date-area");
    const overlay = document.getElementById("overlay");
    dateArea.style.display = "none";
    overlay.style.display = "none";
}

function displayChoiceArea(){
    const dateArea = document.getElementById("date-area");
    const choiceArea = document.getElementById("choice-area")
    dateArea.style.display = "none";
    choiceArea.style.display = "block";
}

function closeChoiceArea(){
    const choiceArea = document.getElementById("choice-area")
    const overlay = document.getElementById("overlay");
    choiceArea.style.display = "none";
    overlay.style.display = "none";
}

function clickSeat(seat){
    const selectedSeat = document.getElementById(`${seat.id}`)

    if (purchasedSeats.includes(seat.id)){
        return;
    }

    else{
        if (selectedSeats.includes(seat.id) != true){
            selectedSeat.style.backgroundColor = "#8B008B";
            selectedSeats.push(selectedSeat.id);
            seats.textContent = selectedSeats.join(" ");
            total += 30;
            totalPrice.textContent = `R$ ${total},00`
            return;
        }
        
        else{
            selectedSeat.style.backgroundColor = "rgb(24, 201, 5)";
            selectedSeats = selectedSeats.filter((chosenSeat) => chosenSeat != seat.id)
            seats.textContent = selectedSeats.join(" ");
            total -= 30;
            totalPrice.textContent = `R$ ${total},00`
            return;
        }
    } 
}

function purchase(){
    for(let boughtSeat of selectedSeats){
        boughtSeat = document.getElementById(boughtSeat);
        boughtSeat.style.backgroundColor = "red";
        boughtSeat.classList.add("purchased")
        purchasedSeats.push(boughtSeat.id);
        selectedSeats = selectedSeats.filter((seats) => seats != boughtSeat.id)
    }

    total = 0;
    totalPrice.textContent = `R$ ${total},00`
    seats.textContent = selectedSeats.join(" ");
}
