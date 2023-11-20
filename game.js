const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Siapa nama presiden Indonesia?",
        choice1: "Jokowi",
        choice2: "Prabowo",
        choice3: "Alggiant",
        choice4: "Rizky",
        answer: 1
    },
    {
        question: "Siapa pemenang baloon d'or 2023?",
        choice1: "Mbappe",
        choice2: "Dodo",
        choice3: "Messi",
        choice4: "Haaland",
        answer: 3
    },
    {
        question: "Siapa Orang Paling Rusuh Di Polnes?",
        choice1: "Adi",
        choice2: "Apip",
        choice3: "Raihan",
        choice4: "Zaki",
        answer: 2
    },
    {
        question: "Dimana Adi Tertangkap Coli?",
        choice1: "Indomaret",
        choice2: "Kamar Kos",
        choice3: "Parkiran",
        choice4: "Depan Rektorat",
        answer: 2
    },
    {
        question: "Siapa orang paling so info?",
        choice1: "Allgiant",
        choice2: "Rizky",
        choice3: "Rifky",
        choice4: "Alam",
        answer: 2
    },
    {
        question: "Siapa nama penyanyi Coldplay ?",
        choice1: "John Cena",
        choice2: "Brock Lesnar",
        choice3: "Chris Martin",
        choice4: "Valentino Rossi’s",
        answer: 3
    },
    {
        question: "Kapan Indonesia Merdeka?",
        choice1: "17 Agustus 1945",
        choice2: "15 Oktober 1947",
        choice3: "15 Agustus 1947",
        choice4: "17 Agustus 1945",
        answer: 3
    },
    {
        question: "Dimana Jepang meledak?",
        choice1: "Hiroshima Nagasaki",
        choice2: "Seoul",
        choice3: "Pyongyang",
        choice4: "Samboja Barat",
        answer: 1
    },
    {
        question: "Nama penjelajah pertama dari Spanyol?",
        choice1: "Christopher Columbus",
        choice2: "Sid Goralnik",
        choice3: "Rob Bailystock",
        choice4: "Nick Layster",
        answer: 1
    },
    {
        question: "Siapa pemenang Royal Rumble 2022?",
        choice1: "Brock Lesnar",
        choice2: "Randy Orton",
        choice3: "Rey Mysterio",
        choice4: "Alam Maguire",
        answer: 1
    },
    {
        question: "1 + 4 x 25 ?",
        choice1: "125",
        choice2: "150",
        choice3: "115",
        choice4: "225",
        answer: 1
    },
    {
        question: "2?",
        choice1: "2",
        choice2: "150",
        choice3: "115",
        choice4: "225",
        answer: 1
    },
    {
        question: "5?",
        choice1: "125",
        choice2: "5",
        choice3: "115",
        choice4: "225",
        answer: 2
    },
    {
        question: "6?",
        choice1: "125",
        choice2: "150",
        choice3: "6",
        choice4: "225",
        answer: 3
    },
    {
        question: "3?",
        choice1: "125",
        choice2: "150",
        choice3: "115",
        choice4: "3",
        answer: 4
    },
    {
        question: "9?",
        choice1: "125",
        choice2: "150",
        choice3: "9",
        choice4: "225",
        answer: 3
    },
    {
        question: "12?",
        choice1: "125",
        choice2: "12",
        choice3: "115",
        choice4: "225",
        answer: 2
    },
    {
        question: "20?",
        choice1: "20",
        choice2: "150",
        choice3: "115",
        choice4: "225",
        answer: 1
    },
    {
        question: "7?",
        choice1: "125",
        choice2: "150",
        choice3: "7",
        choice4: "225",
        answer: 3
    },
    {
        question: "8?",
        choice1: "125",
        choice2: "150",
        choice3: "8",
        choice4: "225",
        answer: 3
    },
    {
        question: "Shadow Power ?",
        choice1: "execute",
        choice2: "150",
        choice3: "115",
        choice4: "225",
        answer: 1
    }

];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore",score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = ` Question ${questionCounter}/${MAX_QUESTIONS}`;
    
    progressBarFull.style.width = `${((questionCounter - 1) / MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        // console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
        }
        //let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);


    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
