let totalPrice = document.getElementById("total");
let seats = document.getElementById("seats");
let session;
let total = 0;
let priorDate;
let date;
let time;
let clientName;
let ticketSeat;
let selected = false;

function loadSessions() {
    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) {
        return JSON.parse(savedSessions);
    }
    return {
        session1: [["A1", "A2", "A3", "A4"], [], [], "13/06", "15:00"],
        session2: [["B1", "B2", "B3", "B4"], [], [], "13/06", "20:00"],
        session3: [["C1", "C2", "C3", "C4"], [], [], "14/06", "14:00"],
        session4: [["D1", "D2", "D3", "D4"], [], [], "14/06", "18:00"],
        session5: [["E1", "E2", "E3", "E4"], [], [], "14/06", "21:00"],
        session6: [["F1", "F2", "F3", "F4"], [], [], "15/06", "11:00"],
        session7: [["G1", "G2", "G3", "G4"], [], [], "15/06", "15:00"],
        session8: [["H1", "H2", "H3", "H4"], [], [], "15/06", "20:00"],
        session9: [["I1", "I2", "I3", "I4"], [], [], "16/06", "11:00"],
        session10: [["J1", "J2", "J3", "J4"], [], [], "16/06", "15:00"],
        session11: [["A13", "A14", "A15", "A16"], [], [], "16/06", "19:00"],
        session12: [["B17", "B18", "B19", "B20"], [], [], "17/06", "15:00"],
        session13: [["C17", "C18", "C19", "C20"], [], [], "17/06", "20:00"],
        session14: [["D17", "D18", "D19", "D20"], [], [], "18/06", "20:00"],
        session15: [["E17", "E18", "E19", "E20"], [], [], "19/06", "14:00"],
        session16: [["F17", "F18", "F19", "F20"], [], [], "19/06", "20:00"],
    };
}

const logan = loadSessions();
totalPrice.textContent = `R$ ${total},00`;

function saveSessions() {
    localStorage.setItem('sessions', JSON.stringify(logan));
}

function displaySessions(selectedDate) {
    if (priorDate != null && priorDate != selectedDate) {
        document.getElementById(priorDate).style.display = "none";
    }

    date = document.getElementById(selectedDate);
    if (date.style.display == "none") {
        date.style.display = "block";
        priorDate = selectedDate;
    } else {
        date.style.display = "none";
        priorDate = selectedDate;
    }
}

function displayDateArea() {
    let ticketList = document.getElementsByClassName("ticket");

    Array.from(ticketList).forEach(i => i.remove());

    const dateArea = document.getElementById("date-area");
    const overlay = document.getElementById("overlay");
    dateArea.style.display = "block";
    overlay.style.display = "block";
}


function closeDateArea() {
    const dateArea = document.getElementById("date-area");
    const overlay = document.getElementById("overlay");
    dateArea.style.display = "none";
    overlay.style.display = "none";
}

function displayChoiceArea(value) {
    session = value;
    date = session[3];
    time = session[4];

    for (let i of document.getElementsByClassName("seat")) {
        i.style.backgroundColor = "rgb(24, 201, 5)";
        i.style.cursor = "pointer";
    }

    for (let i of session[0]) {
        let purchased = document.getElementById(i);
        if (purchased) {
            purchased.style.backgroundColor = "red";
            purchased.style.cursor = "not-allowed";
            purchased.classList.add("purchased");
        }
    }

    const dateArea = document.getElementById("date-area");
    const choiceArea = document.getElementById("choice-area");
    dateArea.style.display = "none";
    choiceArea.style.display = "block";
}

function closeChoiceArea() {
    const choiceArea = document.getElementById("choice-area");
    const overlay = document.getElementById("overlay");
    choiceArea.style.display = "none";
    overlay.style.display = "none";
    session[1] = [];
    total = 0;
    totalPrice.textContent = `R$ ${total},00`;
    seats.textContent = session[1].join(" ");
}

function clickSeat(seat) {
    const selectedSeat = document.getElementById(`${seat.id}`);

    if (session[0].includes(seat.id)) {
        return;
    }

    if (!session[1].includes(seat.id)) {
        selectedSeat.style.backgroundColor = "#8B008B";
        session[1].push(selectedSeat.id);
        total += 30;
    } else {
        selectedSeat.style.backgroundColor = "rgb(24, 201, 5)";
        session[1] = session[1].filter(chosenSeat => chosenSeat !== seat.id);
        total -= 30;
    }

    seats.textContent = session[1].join(" ");
    totalPrice.textContent = `R$ ${total},00`;
}

function displayPurchaseArea() {
    if (session[1].length > 0) {
        document.getElementById("overlay2").style.display = "block";
        document.getElementById("purchase-area").style.display = "block";
    }
}

function closePurchaseArea() {
    document.getElementById("overlay2").style.display = "none";
    document.getElementById("purchase-area").style.display = "none";
    document.getElementById("ticket-area").style.display = "none";
}

function purchase() {
    if (document.getElementById("name").value.trim() !== "" && document.getElementById("surname").value.trim() !== "") {
        if (selected) {
            if (selected === "cartao" && (document.getElementById("cardNumber").value.trim() === "" || document.getElementById("cardPassword").value.trim() === "")) {
                window.alert("Por favor, preencha os dados do cartão");
                return;
            } else if (selected === "cartao" && (isNaN(Number(document.getElementById("cardNumber").value)) || isNaN(Number(document.getElementById("cardPassword").value)))) {
                window.alert("Os dados do cartão precisam ser números");
                return;
            } else {
                for (let boughtSeat of session[1]) {
                    session[0].push(boughtSeat);
                    session[2].push(boughtSeat);
                }

                session[1] = [];
                saveSessions();

                for (let boughtSeatId of session[0]) {
                    let boughtSeat = document.getElementById(boughtSeatId);
                    if (boughtSeat) {
                        boughtSeat.style.backgroundColor = "red";
                        boughtSeat.classList.add("purchased");
                    }
                }

                total = 0;
                totalPrice.textContent = `R$ ${total},00`;
                seats.textContent = session[1].join(" ");
                displayTickets();
            }
        } else {
            window.alert("Por favor, escolha uma forma de pagamento");
        }
    } else {
        window.alert("Por favor, informe seu nome e sobrenome");
    }
}

function selectPayment(value) {
    if (value === "debito" || value === "credito") {
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("card").style.display = "block";
        selected = "cartao";
    } else {
        document.getElementById("card").style.display = "none";
        document.getElementById("qrcode").style.display = "block";
        selected = "pix";
    }
}

function displayTickets() {
    document.getElementById("overlay2").style.opacity = "0.7";
    document.getElementById("purchase-area").style.display = "none";
    document.getElementById("ticket-area").style.display = "block";
    document.getElementById("exit-ticket").style.display = "block";

    for (let seatId of session[2]) {
        let ticket = document.createElement("div");
        ticket.innerHTML = `
            <span id="moviedate">${date} - ${time}</span>
            <p id="client">${document.getElementById("name").value} ${document.getElementById("surname").value}</p>
            <h4 id="barcode">${Math.floor(Math.random() * 1000000000)}</h4>
            <h2 id="movieseat">${seatId}</h2>
        `;
        ticket.classList.add("ticket");
        document.querySelector(".ticket-area").appendChild(ticket);
    }

    session[2] = [];
}

function closeAll() {
    document.getElementById("ticket-area").style.display = "none";
    document.getElementById("overlay2").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("choice-area").style.display = "none";
}

window.onload = () => {
    for (let sessionKey in logan) {
        let session = logan[sessionKey];
        for (let seatId of session[0]) {
            let seatElement = document.getElementById(seatId);
            if (seatElement) {
                seatElement.style.backgroundColor = "red";
                seatElement.classList.add("purchased");
                seatElement.style.cursor = "not-allowed";
            }
        }
    }
}
