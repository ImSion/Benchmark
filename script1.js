
//variabile di verifica per far funzionare la funzione procedi
let verifica = false;

// creo e assegno la variabile boxCheck alla icona a forma di spunta ".fa-solid"
let boxCheck = document.querySelector(".fa-solid") 
boxCheck.style.color= "transparent" // rendo la icona trasparente

//funzione che mi serve per spuntare la casella e modificare la variabile verifica
function check() {  
    if(boxCheck.style.color =="transparent") {  //controlla se è trasparente
        boxCheck.style.color = "green" // in questo caso diventa verde
        verifica= true; // passiamo la variabile verifica a True
    } else {
        boxCheck.style.color = "transparent" //sennò ritorna trasparente
        verifica = false; // ritorna la variabile verifica a False
    }
}

//funzione per il bottone proceed

function procedi() {
    if (verifica) {  // Se la variabile è vera allora 
        location.href = "benchmark.html"; // rindirizza verso la seconda pagina

    } else {
        alert("You must click on the checkBox before moving forward") // senno manda un alert
    }
}