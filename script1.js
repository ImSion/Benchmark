let verifica= false;
let boxCheck = document.querySelector(".fa-solid") 
boxCheck.style.color= "transparent"
function check() {  
    if(boxCheck.style.color =="transparent") {  //controlla se non è stato impostato un colore
        boxCheck.style.color = "green" //se non è stato impostato allora metti questo
        verifica= true;
    } else {
        boxCheck.style.color = "transparent" //se è stato impostato toglilo.
        verifica = false;
    }
}

function procedi() {
    if (verifica) {
        location.href = "benchmark.html";

    } else {
        alert("You must click on the checkBox before moving forward")
    }
}