const allQuestions = [
    {question:"Which keyword is used to define a function in Python?",choices:["func","def","function","define"],answer:"def"},
    {question:"How do you insert comments in Python?",choices:["// comment","# comment","/* comment */","-- comment"],answer:"# comment"},
    {question:"Which data type is used to store text?",choices:["int","str","bool","list"],answer:"str"},
    {question:"What is the correct way to create a variable?",choices:["x = 5","int x = 5","x := 5","declare x = 5"],answer:"x = 5"},
    {question:"Which symbol is used for exponentiation?",choices:["^","**","//","%%"],answer:"**"},
    {question:"What does len() do?",choices:["Counts items","Adds values","Deletes items","Sorts items"],answer:"Counts items"},
    {question:"Which keyword is used for loops?",choices:["loop","iterate","for","repeat"],answer:"for"},
    {question:"How do you start a conditional statement?",choices:["if x > 5:","if (x > 5)","if x > 5 then","when x > 5"],answer:"if x > 5:"},
    {question:"Which is a list?",choices:["(1,2,3)","[1,2,3]","{1,2,3}","<1,2,3>"],answer:"[1,2,3]"},
    {question:"How do you print in Python?",choices:["echo()","print()","console.log()","printf()"],answer:"print()"},
    {question:"Which keyword exits a loop?",choices:["stop","exit","break","end"],answer:"break"},
    {question:"What does continue do?",choices:["Stops loop","Skips iteration","Ends program","Repeats loop"],answer:"Skips iteration"},
    {question:"Which data type is True/False?",choices:["int","str","bool","float"],answer:"bool"},
    {question:"How to create a dictionary?",choices:["[]","()","{}","<>"],answer:"{}"},
    {question:"Which method adds item to list?",choices:["add()","append()","insert()","push()"],answer:"append()"},
    {question:"What is correct tuple?",choices:["[1,2]","(1,2)","{1,2}","<1,2>"],answer:"(1,2)"},
    {question:"Which operator checks equality?",choices:["=","==","===","!="],answer:"=="},
    {question:"Which operator means NOT equal?",choices:["!=","<>","~=","=!"],answer:"!="},
    {question:"How do you import a module?",choices:["include math","import math","using math","require math"],answer:"import math"},
    {question:"Which function converts to int?",choices:["str()","int()","float()","bool()"],answer:"int()"},
    {question:"What does range() do?",choices:["Generates sequence","Sorts list","Counts items","Loops forever"],answer:"Generates sequence"},
    {question:"Which keyword handles exceptions?",choices:["try","catch","handle","except"],answer:"try"},
    {question:"What follows try block?",choices:["catch","except","error","handle"],answer:"except"},
    {question:"Which is correct function call?",choices:["call func()","func[]","func()","run func"],answer:"func()"},
    {question:"What is indentation used for?",choices:["Decoration","Grouping code","Comments","Variables"],answer:"Grouping code"},
    {question:"Which loop runs while condition is true?",choices:["for","loop","while","repeat"],answer:"while"},
    {question:"Which keyword defines class?",choices:["object","class","define","struct"],answer:"class"},
    {question:"How to access list item?",choices:["list(0)","list[0]","list{0}","list<0>"],answer:"list[0]"},
    {question:"What does input() do?",choices:["Prints","Takes input","Deletes input","Stores output"],answer:"Takes input"},
    {question:"Which keyword returns value?",choices:["send","return","output","give"],answer:"return"}
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
const MAX_QUESTIONS = 10;
const TIME_PER_QUESTION = 15;

// DOM Elements
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const progressText = document.getElementById('question-progress');
const timeLeftDisplay = document.getElementById('time-left');
const nextBtn = document.getElementById('next-btn');
const feedbackMessage = document.getElementById('feedback-message');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initQuiz() {
    if (!questionText) return; // Not on the quiz page

    // Select 10 random questions
    const shuffledAll = shuffleArray([...allQuestions]);
    currentQuestions = shuffledAll.slice(0, MAX_QUESTIONS);
    
    currentQuestionIndex = 0;
    score = 0;
    
    nextBtn.addEventListener('click', handleNextQuestion);
    
    loadQuestion();
}

function loadQuestion() {
    resetState();
    
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    progressText.textContent = `Question ${currentQuestionIndex + 1}/${MAX_QUESTIONS}`;
    
    // Shuffle choices
    const choices = shuffleArray([...currentQuestion.choices]);
    
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => selectAnswer(button, currentQuestion.answer));
        choicesContainer.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = TIME_PER_QUESTION;
    timeLeftDisplay.textContent = timeLeft;
    document.getElementById('timer').style.color = '#c26161'; // Reset timer color
    
    nextBtn.classList.add('hidden');
    feedbackMessage.textContent = '';
    feedbackMessage.className = '';
    
    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        
        if (timeLeft <= 5) {
            document.getElementById('timer').style.color = '#a84a4a'; // Darker red when critical
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

function selectAnswer(selectedButton, correctAnswer) {
    clearInterval(timer); // Stop timer
    
    const selectedAnswer = selectedButton.textContent;
    const isCorrect = selectedAnswer === correctAnswer;
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
        feedbackMessage.textContent = 'Correct!';
        feedbackMessage.className = 'feedback-correct';
    } else {
        selectedButton.classList.add('wrong');
        feedbackMessage.textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
        feedbackMessage.className = 'feedback-wrong';
    }
    
    disableAllChoices(correctAnswer);
    nextBtn.classList.remove('hidden');
}

function handleTimeUp() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    feedbackMessage.textContent = `Time's up! The correct answer was: ${currentQuestion.answer}`;
    feedbackMessage.className = 'feedback-time-up';
    
    disableAllChoices(currentQuestion.answer);
    nextBtn.classList.remove('hidden');
}

function disableAllChoices(correctAnswer) {
    const buttons = choicesContainer.querySelectorAll('.choice-btn');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });
}

function handleNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < MAX_QUESTIONS) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    window.location.href = `/result?score=${score}&total=${MAX_QUESTIONS}`;
}

// Initialize if on the right page
document.addEventListener('DOMContentLoaded', initQuiz);
