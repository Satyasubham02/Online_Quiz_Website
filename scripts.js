let currentQuestion = 0;
let score = 0;
let selectedQuiz = '';
let userAnswers = [];

const quizzes = {
    science: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" },
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"], answer: "Mitochondria" },
        { question: "How many states of matter are there?", options: ["Three", "Four", "Five", "Six"], answer: "Four" },
        { question: "What is the speed of light?", options: ["299,792 km/s", "300,000 km/s", "150,000 km/s", "299,792 m/s"], answer: "299,792 km/s" },
    ],
    history: [
        { question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], answer: "George Washington" },
        { question: "In which year did the Titanic sink?", options: ["1912", "1911", "1913", "1910"], answer: "1912" },
        { question: "Who discovered America?", options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook"], answer: "Christopher Columbus" },
        { question: "When did World War I begin?", options: ["1914", "1915", "1916", "1917"], answer: "1914" },
        { question: "Who was known as the Iron Lady?", options: ["Margaret Thatcher", "Indira Gandhi", "Golda Meir", "Angela Merkel"], answer: "Margaret Thatcher" },
    ],
    math: [
        { question: "What is 5 + 3?", options: ["7", "8", "9", "10"], answer: "8" },
        { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: "4" },
        { question: "What is 9 x 9?", options: ["80", "81", "82", "83"], answer: "81" },
        { question: "What is 12 / 4?", options: ["2", "3", "4", "5"], answer: "3" },
        { question: "What is 20% of 200?", options: ["30", "40", "50", "60"], answer: "40" },
    ]
};

document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('user-info').classList.add('d-none');
    document.getElementById('quiz-topic').classList.remove('d-none');
});

function backToUserInfo() {
    document.getElementById('quiz-topic').classList.add('d-none');
    document.getElementById('user-info').classList.remove('d-none');
}

function startQuiz(topic) {
    selectedQuiz = topic;
    userAnswers = new Array(quizzes[selectedQuiz].length).fill(null);
    document.getElementById('quiz-topic').classList.add('d-none');
    document.getElementById('quiz-section').classList.remove('d-none');
    document.getElementById('quiz-title').textContent = `${topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz`;
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const quiz = quizzes[selectedQuiz];
    const question = quiz[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('a');
        optionElement.classList.add('list-group-item', 'list-group-item-action');
        optionElement.textContent = option;
        optionElement.onclick = () => selectAnswer(option, index);
        if (userAnswers[currentQuestion] === option) {
            optionElement.classList.add('active');
        }
        optionsContainer.appendChild(optionElement);
    });
}

function selectAnswer(selectedOption, index) {
    const optionsContainer = document.getElementById('options');
    const optionElements = optionsContainer.getElementsByClassName('list-group-item');
    for (let i = 0; i < optionElements.length; i++) {
        optionElements[i].classList.remove('active');
    }
    optionElements[index].classList.add('active');
    userAnswers[currentQuestion] = selectedOption;
}

function nextQuestion() {
    if (currentQuestion < quizzes[selectedQuiz].length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        calculateScore();
        showFeedback();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function calculateScore() {
    score = 0;
    const quiz = quizzes[selectedQuiz];
    userAnswers.forEach((answer, index) => {
        if (answer === quiz[index].answer) {
            score++;
        }
    });
}

function showFeedback() {
    document.getElementById('quiz-section').classList.add('d-none');
    document.getElementById('feedback-section').classList.remove('d-none');
    document.getElementById('score-text').textContent = `You scored ${score} out of ${quizzes[selectedQuiz].length}`;
}
