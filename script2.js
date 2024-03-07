const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];

  
//variabile per le domande
let counter = 0; 

//variabile per il punteggio
let score = 0;

//varibile per timer
let timerInterval = null;

function countdown() {
  // timer 
  const FULL_DASH_ARRAY = 283;
  // impostiamo i secondi in cui cambia colore e diventa arancione per il warning
  const WARNING_THRESHOLD = 15;
  // impostiamo i secondi in cui cambia colore e diventa rosso per l'alert
  const ALERT_THRESHOLD = 7;

  //settiamo le costanti colore divise per info (lightblu), warning (arancione) e alert(rosso)
  const COLOR_CODES = {
    info: {
      color: "blu"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };

  //settiamo il timer e le relative funzioni di richiamo colore in base al tempo rimanente
  const TIME_LIMIT = 30;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let remainingPathColor = COLOR_CODES.info.color;

  //creiamo gli elementi html all'interno del div "timer"
  document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="seconds"> seconds </span>
  
  <span id="base-timer-label" class="base-timer__label"> ${formatTime(
    timeLeft
  )}</span>
  <span id="remaining"> remaining <span>
</div>
`;

//pulisco l'intervallo del timer precedente prima di avviarne un altro 
if(timerInterval !== null){
  clearInterval(timerInterval);
}

  startTimer();

  function onTimesUp() {
    clearInterval(timerInterval);
  }

  // impostiamo la funzione startimer
  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
        counter++;
        domande();
      }
    }, 1000);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${seconds}`;
  }

  // settiamo il path che ci consente che il colore della barra cambi a seconda dello stato del timer
  // se è ancora in zona "info" sarà azzura, in zona "warning" diventerà arancione e in zona "alert" rossa
  // i colori vengono richiamati dai rispettivi id e dalle rispettive classi css collegate alla costante COLOR_CODES
  function setRemainingPathColor(timeLeft) {
    const {
      alert,
      warning,
      info
    } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
}

// Aggiorna il conto alla rovescia ogni secondo


console.log(counter);

// let verifica= false;
// let boxCheck = document.querySelector(".fa-solid") 
// //boxCheck.style.color= "transparent"
// function check() {  
//     if(boxCheck.style.color =="transparent") {  //controlla se non è stato impostato un colore
//         boxCheck.style.color = "green" //se non è stato impostato allora metti questo
//         verifica= true;
//     } else {
//         boxCheck.style.color = "transparent" //se è stato impostato toglilo.
//         verifica = false;
//     }
// }

// function procedi() {
//     if (verifica) {
//         location.href = "benchmark.html";

//     } else {
//         alert("You must click on the checkBox before moving forward")
//     }
// }


//Box per le domande

//per selezionare una domanda, utilizzeremo una variabile che, quando scade il tempo o quando l'utente darà una risposta, aumenterà. Questa varibaile sarà l'indice del nostro array, di conseguenza non avremo bisogno dei for per ciclare le domande. Può essere usata (aggiungendo + 1), per mostrare a quale domanda siamo (prima, seconda, ecc...)
function domande(){
  countdown();
  //rimuovo le vecchie risposte
  let btnContainer = document.getElementById("form")
  while(btnContainer.firstChild){
    btnContainer.removeChild(btnContainer.firstChild)
  }

  //verifico se ho altre domande da inserire
  if(counter === questions.length){
    let question = document.getElementById("question");
    //question.innerHTML = "Esame finito, il tuo risultato è di: " + score + " risposte esatte su " + counter;
    let scoreResult = question.innerHTML =  (score * 100)/counter + "%";
    console.log(scoreResult);
    //console.log("esame finito");
    let timer = document.getElementById("timer")
    timer.remove();
    let footer1 = document.getElementById("questioncounter");
    footer1.remove();
    return;
  }

  
  //prendo la domanda
  let domanda = document.getElementById("question");
  domanda.innerHTML = questions[counter].question;

  //facciamo un array con le risposte al suo interno
  let risposte = [];

  //controllo per vedere se esistono più risposte corrette, NB: nelle correct answer viene passata una stringa, non un array di stringhe. Ciò accade solo per le incorrect answer, perciò dobbiamo prendere per certo che la risposta esatta sia solo una.
  // if(questions[counter].correct_answer.length < 1) {
  //   for(let i = 0; i < questions[counter].correct_answer.length; i++) {
  //     risposte.push(questions[counter].correct_answer[i]);
  //   }
  // } else {
  //   risposte.push(questions[counter].correct_answer);
  // }

  risposte.push(questions[counter].correct_answer);

  for(let i = 0; i < questions[counter].incorrect_answers.length; i++) {
    risposte.push(questions[counter].incorrect_answers[i]);
  }

  //randomizzo la disposizione delle risposte mischiando il contenuto dell'array
  risposte.sort(() => Math.random()- 0.5);

  //console.log(risposte);

  //creo e aggiungo al div delle answer, i vari bottoni con le varie risposte
  let container = document.getElementById("form"); 
  for(let i = 0; i < risposte.length; i++) {
    let bottone = document.createElement("button");
    bottone.textContent = risposte[i];
    bottone.classList.add("answer");
    container.appendChild(bottone);
  }
  let buttons = document.getElementsByClassName("answer");
  for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener(`click`, function(){
      let button = buttons[i].textContent;
      //console.log(button);
      if(button === questions[counter].correct_answer){
        counter++;
        score++;
        domande();
      }else {
        counter++;
        domande()
      }
    })
  }
  let footer1 = document.getElementById("questioncounter");
  footer1.innerHTML = "QUESTION " + (counter+1) + "<p>/10</p>"
  countdown();
}
domande();
