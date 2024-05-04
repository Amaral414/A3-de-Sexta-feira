let totalPrice = document.getElementById("total");
let seats = document.getElementById("seats");

let selectedSeats = [];
let purchasedSeats = [];
let total = 0;

purchase();
totalPrice.textContent = `R$ ${total},00`

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

    if (purchasedSeats.includes(seat.id)){
        return;
    }

    else{
        if (selectedSeats.includes(seat.id) != true){
            selectedSeat.style.backgroundColor = "#8B008B";
            selectedSeats.push(selectedSeat.id);
            console.log(selectedSeats);
            seats.textContent = selectedSeats.join(" ");
            total += 30;
            totalPrice.textContent = `R$ ${total},00`
            return;
        }
        
        else{
            selectedSeat.style.backgroundColor = "rgb(24, 201, 5)";
            selectedSeats = selectedSeats.filter((chosenSeat) => chosenSeat != seat.id)
            console.log(selectedSeats);
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
        console.log(boughtSeat.classList)
        purchasedSeats.push(boughtSeat.id);
        selectedSeats = selectedSeats.filter((seats) => seats != boughtSeat.id)
    }

    total = 0;
    totalPrice.textContent = `R$ ${total},00`
    seats.textContent = selectedSeats.join(" ");
}
