function displayChoiceArea(){
    const choiceArea = document.getElementById("choice-area");
    choiceArea.style.display = "block";
}

function closeChoiceArea(){
    const choiceArea = document.getElementById("choice-area");
    choiceArea.style.display = "none";
    const arrayDates = ["date1", "date2", "date3", "date4"]

    for (let date of arrayDates){
        document.getElementById(date).style.display = "block";
    }

}

function displayDate1(){
    const arrayDates = ["date2", "date3", "date4"]

    for (let date of arrayDates){
        document.getElementById(date).style.display = "none";
    }

    document.getElementsById("session1").style.display = "block";
    document.getElementsById("title1").style.display = "block";
    document.getElementsById("options1").style.display = "block";
}

function displayDate2(){
    const arrayDates = ["date1", "date3", "date4"]

    for (let date of arrayDates){
        document.getElementById(date).style.display = "none";
    }
}

function displayDate3(){
    const arrayDates = ["date1", "date2", "date4"]

    for (let date of arrayDates){
        document.getElementById(date).style.display = "none";
    }
}

function displayDate4(){
    const arrayDates = ["date1", "date2", "date3"]

    for (let date of arrayDates){
        document.getElementById(date).style.display = "none";
    }
}